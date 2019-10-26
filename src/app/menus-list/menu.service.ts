import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenus() {
    return this.http.post(
      // URL
      'http://'+localStorage.getItem('webServiceIP')+':8080/ws-restaurante-siglo-xxi/webresources/listar',
      // Params:
      'procedure=LISTAR_MENU&package=PKG_MANTENEDORES&data=[{param:"IO_CURSOR",tipo_dato:"cursor",tipo_param:"OUT",value:""}]',
      // Headers:
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    );
  }

  getDetalleMenu(menuID) {
    return this.http.post(
      // URL
      'http://'+localStorage.getItem('webServiceIP')+':8080/ws-restaurante-siglo-xxi/webresources/listar',
      // Params:
      'procedure=LISTAR_DETALLE_MENU&package=PKG_MANTENEDORES&data=[{param:"IO_CURSOR",tipo_dato:"cursor",tipo_param:"OUT",value:""},{param:"PID_MENU",tipo_dato:"NUMBER",tipo_param:"IN",value:"'+menuID+'"}]',
      // Headers:
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    );
  }
}
