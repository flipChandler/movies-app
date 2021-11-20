import { Component, OnInit } from '@angular/core';
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
  filmes: Filme[] = [];

  constructor(private filmeSvc: FilmeService) { }

  ngOnInit() {
      this.listarFilmes();
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
}
