import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../shared/models/filme.model';
import { Alerta } from '../../shared/models/alerta';

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
    this.buildForm();
  }

  salvar(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }
    this.filmeSvc.salvar(this.cadastro.value).subscribe((response: Filme) => {
      const config = {
        data: {
          btnSucesso: 'Ir para listagem',
          btnCancelar: 'Cadastrar um novo filme',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      this.displayModal(config);
    },
    () => {
      alert('Erro ao salvar');
    });
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  displayModal(config: any) {
    this.dialog.open(AlertaComponent, config);
  }

  buildForm() {
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
}
