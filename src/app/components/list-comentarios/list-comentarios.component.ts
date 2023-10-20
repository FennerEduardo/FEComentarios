import { Component } from '@angular/core';
import { Comentario } from '../../interfaces/Comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
@Component({
  selector: 'app-list-comentarios',
  templateUrl: './list-comentarios.component.html',
  styleUrls: ['./list-comentarios.component.css']
})
export class ListComentariosComponent {
  listComentarios: Comentario[] = [];

  constructor(private _comentarioService: ComentarioService) { }

  ngOnInit(): void {
    this.getcomentarios();

  }
  getcomentarios() {
    this._comentarioService.getListComentarios()
      .subscribe(data => {
        console.log(data);
        this.listComentarios = data;

      }, error => {
        console.log(error);
      });
  }

 

  eliminar(id: any) {
    this._comentarioService.deleteComentario(id)
      .subscribe(data => {
        this.getcomentarios();
      }, error => {
        console.log(error);
      });
  }
}
