import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comentario } from '../../interfaces/Comentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-editar-comentario',
  templateUrl: './agregar-editar-comentario.component.html',
  styleUrls: ['./agregar-editar-comentario.component.css']
})
export class AgregarEditarComentarioComponent {

  agregarComentario: FormGroup;
  accion: string = 'Agregar';
  id: number = 0;
  comentario: Comentario | undefined;

  constructor(
    private fb: FormBuilder,
    private _comentarioService: ComentarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.agregarComentario = this.fb.group({
      titulo: ['', Validators.required],
      creador: ['', Validators.required],
      texto: ['', Validators.required],
    });
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.esEditar();
  }
  esEditar() {
    if (this.id != 0) {
      this.accion = 'Editar';
      this.getComentario();
    }
  }

  agregar() {
    if (this.comentario) {
      const comentario: Comentario = {
        titulo: this.agregarComentario.get('titulo')?.value,
        creador: this.agregarComentario.get('creador')?.value,
        texto: this.agregarComentario.get('texto')?.value,
        id: this.comentario.id,
        fechaCreacion: this.comentario.fechaCreacion
      }
      this.actualizarComentario(comentario);
    } else {
      const comentario: Comentario = {
        titulo: this.agregarComentario.get('titulo')?.value,
        creador: this.agregarComentario.get('creador')?.value,
        texto: this.agregarComentario.get('texto')?.value,
        fechaCreacion: new Date
      }
      this.crearComentario(comentario);
    }
  }

  crearComentario(comentario: Comentario) {
    this._comentarioService.saveComentario(comentario)
      .subscribe(data => {
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      });
  }

  actualizarComentario(comentario: Comentario) {
    if (this.comentario) {
      this._comentarioService.updateComentario(this.id, comentario)
        .subscribe(data => {
          this.router.navigate(['/']);
        }, error => {
          console.log(error);
        });
    }
  }

  getComentario() {
    this._comentarioService.showComentario(this.id)
      .subscribe(data => {
        this.comentario = data;
        this.agregarComentario.patchValue({
          titulo: data.titulo,
          texto: data.texto,
          creador: data.creador,
          fechaCreacion: data.fechaCreacion,
        })
      }, error => {
        console.log(error);
      });
  }
}
