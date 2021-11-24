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
  filtro = {
    texto: '',
    genero: ''
  };


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
    this.filmeSvc.listar(this.pagina, this.qtdPagina, this.filtro).subscribe((response: Filme[]) => {
      this.filmes.push(...response);
    });
  }

  buildForm() {
    this.filtroListagem = this.fb.group({
      texto: [''],
      genero: ['']
    });

    // pega cada alteração em no input-text texto
    this.filtroListagem.get('texto').valueChanges.subscribe((value: string) => {
      this.filtro.texto = value;
      this.resetarConsulta();
    });


    this.filtroListagem.get('genero').valueChanges.subscribe((value: string) => {
      this.filtro.genero = value;
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
    this.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }
}
