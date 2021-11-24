import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../shared/models/filme.model';
import { ConfigParams } from '../../shared/models/config-params';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  params: ConfigParams = {
    pagina: 0,
    limite: 4
  };
  generos: Array<string>;
  filmes: Filme[] = [];
  filtroListagem: FormGroup;
  
  constructor(private filmeSvc: FilmeService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
      this.listarFilmes();
      this.buildForm();
  }

  onScroll() {
    this.listarFilmes();
  }

  abrir(id: number): void {
    this.router.navigateByUrl(`/filmes/${id}`);
  }

  buildForm() {
    this.filtroListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    // pega cada alteração em no input-text texto
    this.filtroListagem.get('texto')
                       .valueChanges
                       .pipe(debounceTime(400)) // evita de ficar a cada caracter digitado do filtro fazendo request
                       .subscribe((value: string) => {
      this.params.pesquisa = value;
      this.resetarConsulta();
    });

    this.filtroListagem.get('genero').valueChanges.subscribe((value: string) => {
      this.params.campo = { tipo: 'genero', valor: value};
      this.resetarConsulta();
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

  resetarConsulta(): void {
    this.params.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }

  // ... para concatenar 2 arrrays (spread operator) | filmes esperava apenas 1 filme
  private listarFilmes(): void {
    this.params.pagina++;
    this.filmeSvc.listar(this.params).subscribe((response: Filme[]) => {
      this.filmes.push(...response);
    });
  }  
}
