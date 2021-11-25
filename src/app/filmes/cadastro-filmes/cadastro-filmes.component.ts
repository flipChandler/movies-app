import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../shared/models/filme.model';
import { Alerta } from '../../shared/models/alerta';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  id: number;
  cadastro: FormGroup;
  generos: Array<string>;
  filme: Filme;

  constructor(public validaCamposSvc: ValidarCamposService, 
              public dialog: MatDialog,
              private fb: FormBuilder,
              private filmeSvc: FilmeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.filmeSvc.visualizar(this.id).subscribe(( response: Filme) => {
        this.buildForm(response);
      });
    } else {
      this.buildForm(this.criarFilmeEmBranco());
    }
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

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }
    const filme = this.cadastro.getRawValue() as Filme;
    if (this.id) {
      filme.id = this.id;
      this.editar(filme);
    } else {
      this.salvar(filme);
    }
  }

  salvar(filme: Filme): void {
    this.filmeSvc.salvar(filme).subscribe((response: Filme) => {
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
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro. Por favor tente mais tarde!',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar',
        } as Alerta
      };
      this.displayModal(config);
    });
  }

  private editar(filme: Filme): void {
    this.filmeSvc.editar(filme).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigateByUrl('filmes');
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  displayModal(config: any) {
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.router.navigateByUrl('filmes');
      } else {
        this.reiniciarForm();
      }
    });
  }

  buildForm(filme: Filme) {
    this.cadastro = this.fb.group({
      titulo: [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]]
    });    
  }

  private criarFilmeEmBranco(): Filme {
    return {
      id: null,
      titulo: null,
      dtLancamento: null,
      urlFoto: null,
      descricao: null,
      nota: null,
      urlImdb: null,
      genero: null
    } as Filme;
  }
}
