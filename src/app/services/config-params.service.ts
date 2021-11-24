import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigParams } from '../shared/models/config-params';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configuraParametros(params: ConfigParams): HttpParams {
    let httpParams = new HttpParams();
    if (params.pagina) {
      httpParams = httpParams.set('_page', params.pagina.toString());
    }
    if (params.limite) {
      httpParams = httpParams.set('_limit', params.limite.toString());
    }
    if (params.pesquisa) {
      httpParams = httpParams.set('q', params.pesquisa); // q = full-text
    }
    if (params.campo) {
      httpParams = httpParams.set(params.campo.tipo, params.campo.valor.toString());
    }
    httpParams = httpParams.set('_sort', 'id');
    httpParams = httpParams.set('_order', 'desc');

    return httpParams;
  }
}
