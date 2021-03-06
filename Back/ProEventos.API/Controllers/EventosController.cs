using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contratos;
using ProEventos.Domain;
using ProEventos.Persistence.Context;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly IEventoService _eventoService;
        public EventosController(IEventoService eventoService)
        {
            _eventoService = eventoService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                 var eventos = await _eventoService.GetAllEventosAsync(true);
                 if(eventos == null) return NotFound("Nenhum evento encontrado."); // Retorna um erro 404 com essa mensagem

                return Ok(eventos); // Retorna um Ok código 200 e o eventos
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                 var evento = await _eventoService.GetEventoByIdAsync(id, true);
                 if(evento == null) return NotFound("Nenhum evento encontrado."); // Retorna um erro 404 com essa mensagem

                return Ok(evento); // Retorna um Ok código 200 e o eventos
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpGet("{tema}/tema")]
        public async Task<IActionResult> GetByTema(string tema)
        {
            try
            {
                 var eventos = await _eventoService.GetAllEventosByTemaAsync(tema, true);
                 if(eventos == null) return NotFound("Eventos por tema não encontrado."); // Retorna um erro 404 com essa mensagem

                return Ok(eventos); // Retorna um Ok código 200 e o eventos
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar eventos. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Evento model)
        {
            try
            {
                 var eventos = await _eventoService.AddEventos(model);
                 if(eventos == null) return BadRequest("Erro ao tentar adicionar evento");

                return Ok(eventos); // Retorna um Ok código 200 e o eventos
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar adicionar eventos. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Evento model)
        {
            try
            {
                 var eventos = await _eventoService.UpdateEvento(id, model);
                 if(eventos == null) return BadRequest("Erro ao tentar adicionar evento");

                return Ok(eventos); // Retorna um Ok código 200 e o eventos
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar atualizar eventos. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
         public async Task<IActionResult> Delete(int id, Evento model)
        {
            try
            {
                if(await _eventoService.DeleteEvento(id))
                    return Ok("Deletado");
                else
                    return BadRequest("Evento não deletado.");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar deletar eventos. Erro: {ex.Message}");
            }
        }
    }
}
