import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../shared/models/filme.model';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  filmes: Filme[] = [];
  fotos: any = [];
  constructor(private filmeSvc: FilmeService) { }

  async ngOnInit() {
    await this.filmeSvc.listar().subscribe((response: Filme[]) => {
      this.filmes = response;
      this.fotos = this.filmes.map(f => f.urlFoto);
      console.log(this.fotos);
    });
  }
}
