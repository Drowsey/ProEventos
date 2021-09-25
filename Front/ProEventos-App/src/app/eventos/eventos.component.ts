import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos : any = [];
  public eventosFiltrados : any = [];
  public isImgCollapsed = false;
  widthImg = 110;
  marginImg = 2;
  private _listFilter : string = '';

  public get listFilter() : string{
    return this._listFilter;
  }

  public set listFilter(value:string){
    this._listFilter = value;
    this.eventosFiltrados = this._listFilter ? this.filtrarEventos(value) : this.eventos;
  }

  filtrarEventos(filterBy:string) :any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filterBy) !== -1
    )
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos() : void{

    this.http.get('https://localhost:5001/eventos').subscribe(
      response => {
        this.eventos = response;
        this.eventosFiltrados = response;
      },
      error => console.log(error)
    );

  }


}
