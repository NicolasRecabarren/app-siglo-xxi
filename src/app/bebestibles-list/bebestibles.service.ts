import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BebestiblesService {

  constructor(private http: HttpClient) { }

  getBebestibles() {
    return this.http.post(
      // URL
      //'http://localhost:8080/ws-restaurante-siglo-xxi/webresources/listar',
      'http://' + localStorage.getItem('webServiceIP') + ':8080/ws-restaurante-siglo-xxi/webresources/listar',
      // Params:
      'procedure=LISTAR_PRODUCTO&package=PKG_MANTENEDORES&data=[{param:"IO_CURSOR",tipo_dato:"cursor",tipo_param:"OUT",value:""}]',
      // Headers:
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    );
  }

  getCategoriasBebestibles() {
    return this.http.post(
      // URL
      //'http://localhost:8080/ws-restaurante-siglo-xxi/webresources/listar',
      'http://' + localStorage.getItem('webServiceIP') + ':8080/ws-restaurante-siglo-xxi/webresources/listar',
      // Params:
      'procedure=LISTAR_CATEGORIA_PRODUCTO&package=PKG_MANTENEDORES&data=[{param:"IO_CURSOR",tipo_dato:"cursor",tipo_param:"OUT",value:""}]',
      // Headers:
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    );
  }
}
