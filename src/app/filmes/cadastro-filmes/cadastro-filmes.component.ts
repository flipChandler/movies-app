import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../shared/models/filme.model';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;
  filme: Filme;

  constructor(public validaCamposSvc: ValidarCamposService, 
              public dialog: MatDialog,
              private fb: FormBuilder,
              private filmeSvc: FilmeService) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {

    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });

    this.generos = [
      'Ação',
      'Romance',
      'Aventura',
      'Terror',
      'Ficção Científica',
      'Comédia',
      'Drama'
    ];

  }

  salvar(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }
    const valor = JSON.stringify(this.cadastro.value, null, 4);
    // alert(`SUCESSO!!\n\n ${valor} `);
    this.filmeSvc.salvar(this.cadastro.value).subscribe((response: Filme) => {
      this.displayModal();
      this.filme = response;
      console.log(this.filme);
    },
    () => {
      alert('Erro ao salvar');
    });
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  displayModal() {
    const dialogRef = this.dialog.open(AlertaComponent);
  }
}
