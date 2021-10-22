import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-eventos-lista',
  templateUrl: './eventos-lista.component.html',
  styleUrls: ['./eventos-lista.component.scss']
})
export class EventosListaComponent implements OnInit {
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
              private modalService: NgbModal,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  public ngOnInit(): void {
    this.getEventos();
    this.spinner.show();
  }

  public getEventos() : void{
    this.eventoService.getEventos().subscribe({
      next: (eventos: Evento[]) => {
        this.eventos = eventos;
        this.eventosFiltrados = this.eventos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.warning('Erro ao carregar eventos.');
      },
      complete: () => this.spinner.hide()
    });

  }

  openSm(content: any): void{
    this.modalService.open(content, { size: 'sm' });
  }

  confirm(): void {
    this.modalService.dismissAll();
    this.toastr.success('Evento deletado.');

  }


}
