import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../shared/models/filme.model';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly qtdPagina = 4;
  pagina = 0;
  generos: Array<string>;
  filmes: Filme[] = [];
  filtroListagem: FormGroup;

  constructor(private filmeSvc: FilmeService,
              private fb: FormBuilder) { }

  ngOnInit() {
      this.listarFilmes();
      this.buildForm();
  }

  onScroll() {
    this.listarFilmes();
  }

  // ... para concatenar 2 arrrays (spread operator) | filmes esperava apenas 1 filme
  private listarFilmes(): void {
    this.pagina++;
    this.filmeSvc.listar(this.pagina, this.qtdPagina).subscribe((response: Filme[]) => {
      this.filmes.push(...response);
    });
  }

  buildForm() {
    this.filtroListagem = this.fb.group({
      texto: [''],
      genero: ['']
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
