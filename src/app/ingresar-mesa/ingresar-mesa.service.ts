import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IngresarMesaService {

  constructor(private http: HttpClient) { }

  getPedido(num_mesa) {
    return this.http.post(
        // URL
        'http://'+localStorage.getItem('webServiceIP')+':8080/ws-restaurante-siglo-xxi/webresources/listar',
        // Params:
        'procedure=TRAER_PEDIDO&package=PKG_PEDIDO&data=[{param:"IO_CURSOR",tipo_dato:"cursor",tipo_param:"OUT",value:""},{"param": "num_mesa","tipo_dato": "number","tipo_param": "IN","value":'+num_mesa+'}]',
        // Headers:
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    );
  }
}
