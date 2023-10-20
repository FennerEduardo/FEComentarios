import { Component } from '@angular/core';
import { Comentario } from '../../interfaces/Comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-comentario',
  templateUrl: './ver-comentario.component.html',
  styleUrls: ['./ver-comentario.component.css']
})
export class VerComentarioComponent {

  comentario: Comentario | undefined;
  id: number = 0;

  constructor(private _comentarioService: ComentarioService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.getComentario();

  }

  getComentario() {
    this._comentarioService.showComentario(this.id)
      .subscribe(data => {
        this.comentario = data;
      }, error => {
        console.log(error);
      });
  }
}
