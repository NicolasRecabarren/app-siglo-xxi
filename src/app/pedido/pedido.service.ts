import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  actualizarEstadoPedido(pedidoID, nuevoEstado) {
    return this.http.post(
      // URL
      'http://localhost:8080/ws-restaurante-siglo-xxi/webresources/listar',
      // Params:
      'procedure=ACTUALIZAR_ESTADO_PEDIDO&package=PKG_PEDIDO&data=[{param:"PID_PEDIDO",tipo_dato:"NUMBER",tipo_param:"IN",value:"'+pedidoID+'"},{"param": "PID_ESTADO_PEDIDO","tipo_dato": "NUMBER","tipo_param": "IN","value":'+nuevoEstado+'}]',
      // Headers:
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    );
  }
}
