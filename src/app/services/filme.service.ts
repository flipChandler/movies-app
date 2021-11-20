import { HttpClient } from '@angular/common/http';
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

  listar(): Observable<Filme[]> {
    return this.http.get<Filme[]>(url);
  }
}
