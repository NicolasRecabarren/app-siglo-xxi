import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartaService {

  constructor(private http: HttpClient) { }

  getCarta() {
    return this.http.post(
        // URL
        'http://localhost:8080/ws-restaurante-siglo-xxi/webresources/listar',
        // Params:
        'procedure=LISTAR_CATEGORIA_PLATO&package=PKG_MANTENEDORES&data=[{param:"IO_CURSOR",tipo_dato:"cursor",tipo_param:"OUT",value:""}]',
        // Headers:
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    );
  }

  /*getCategorias() {
    return this.categorias;
  }

  setCategorias(newCategorias) {
    this.categorias = newCategorias;
  }*/
}
