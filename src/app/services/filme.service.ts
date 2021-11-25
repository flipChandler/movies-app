import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme.model';
import { ConfigParams } from '../shared/models/config-params';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/filmes/';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  constructor(private http: HttpClient,
              private paramsSvc: ConfigParamsService) { }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  // _page e _limit = params esperados na url para o json-server
  listar(configParams: ConfigParams): Observable<Filme[]> {
    const params = this.paramsSvc.configuraParametros(configParams);
    return this.http.get<Filme[]>(url, {params: params});
  }

  visualizar(id: number): Observable<Filme> {
    return this.http.get<Filme>(`${url}${id}`);
  }

  editar(filme: Filme): Observable<Filme> {
    return this.http.put<Filme>(`${url} ${filme.id}`, filme);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${url}${id}`);
  }
}
