import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../shared/models/filme.model';
import { Alerta } from '../../shared/models/alerta';
import { MatDialog } from '@angular/material';
import { AlertaComponent } from '../../shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  id: number;
  filme: Filme;

  constructor(public dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private filmeSvc: FilmeService,
              private router: Router) { }

  ngOnInit() {
    // this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certeza, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.filmeSvc.excluir(this.id).subscribe(() => {
          this.router.navigateByUrl('/filmes');
        });
      }
    });
  }

  private visualizar(): void {
    this.filmeSvc.visualizar(this.id).subscribe((response: Filme) => {
      this.filme = response;
      console.log(this.filme);
    });
  }

}
