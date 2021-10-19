import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {

  public eventos : Evento[] = [];
  public eventosFiltrados : Evento[] = [];
  public isImgCollapsed = false;
  public widthImg: number = 110;
  public marginImg = 2;
  private _listFilter : string = '';

  public get listFilter() : string{
    return this._listFilter;
  }

  public set listFilter(value:string){
    this._listFilter = value;
    this.eventosFiltrados = this._listFilter ? this.filtrarEventos(value) : this.eventos;
  }

  public filtrarEventos(filterBy:string): Evento[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filterBy) !== -1
    )
  }

  constructor(private eventoService:EventoService,
              private modalService: NgbModal) { }

  public ngOnInit(): void {
    this.getEventos();


  }

  public getEventos() : void{

    this.eventoService.getEventos().subscribe(
      (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
      },
      error => console.log(error)
    );

  }

  openSm(content: any): void{
    this.modalService.open(content, { size: 'sm' });
  }
  confirm(): void {
    this.modalService.dismissAll;
  }


}


