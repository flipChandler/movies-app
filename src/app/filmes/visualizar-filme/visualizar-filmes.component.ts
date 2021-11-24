import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../shared/models/filme.model';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  id: number;
  filme: Filme;

  constructor(private activatedRoute: ActivatedRoute,
              private filmeSvc: FilmeService) { }

  ngOnInit() {
    // this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar(this.id);
  }

  private visualizar(id: number): void {
    this.filmeSvc.visualizar(id).subscribe((response: Filme) => {
      this.filme = response;
      console.log(this.filme);
    });
  }

}
