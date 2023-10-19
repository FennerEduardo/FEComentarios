import { Component } from '@angular/core';
import { Comentario } from '../../interfaces/Comentario';
@Component({
  selector: 'app-list-comentarios',
  templateUrl: './list-comentarios.component.html',
  styleUrls: ['./list-comentarios.component.css']
})
export class ListComentariosComponent {
  listComentarios: Comentario[] = [
    {
      titulo: 'Hola',
      creador: 'Fenner',
      texto: 'comentario',
      fechaCreacion: new Date()
    },
    {
      titulo: 'Hola de nuevo',
      creador: 'Fenner',
      texto: 'comentario',
      fechaCreacion: new Date()
    },
    {
      titulo: 'Hola de nuevo otra vez',
      creador: 'Fenner',
      texto: 'comentario',
      fechaCreacion: new Date()
    },
  ];
}
