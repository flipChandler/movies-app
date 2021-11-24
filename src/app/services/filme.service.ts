import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme.model';

const url = 'http://localhost:3000/filmes/';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  constructor(private http: HttpClient) { }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  // _page e _limit = params esperados na url para o json-server
  listar(pagina: number, qtdPagina: number, filtro: any): Observable<Filme[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('_page', pagina.toString());
    httpParams = httpParams.set('_limit', qtdPagina.toString());
    httpParams = httpParams.set('_sort', 'id');
    httpParams = httpParams.set('_order', 'desc');
    if (filtro.texto) {
      httpParams = httpParams.set('q', filtro.texto); // q = full-text
    }
    if (filtro.genero) {
      httpParams = httpParams.set('genero', filtro.genero);
    }

    return this.http.get<Filme[]>(url, {params: httpParams});
  }
}
