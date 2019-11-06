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
      'http://'+localStorage.getItem('webServiceIP')+':8080/ws-restaurante-siglo-xxi/webresources/listar',
      // Params:
      'procedure=ACTUALIZAR_ESTADO_PEDIDO&package=PKG_PEDIDO&data=[{param:"PID_PEDIDO",tipo_dato:"NUMBER",tipo_param:"IN",value:"'+pedidoID+'"},{"param": "PID_ESTADO_PEDIDO","tipo_dato": "NUMBER","tipo_param": "IN","value":'+nuevoEstado+'}]',
      // Headers:
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    );
  }

  ingresarDetalle(detalle, pedidoID) {
    return this.http.post(
      // URL
      'http://'+localStorage.getItem('webServiceIP')+':8080/ws-restaurante-siglo-xxi/webresources/listar',
      // Params:
      'procedure=AGREGAR_DETALLE_PEDIDO&package=PKG_MANTENEDORES&data=['+
        '{param:"PTIPO_PEDIDO",tipo_dato:"VARCHAR2",tipo_param:"IN",value:"'+detalle.TIPO_PEDIDO+'"},'+
        '{param:"PPRECIO",tipo_dato:"NUMBER",tipo_param:"IN",value:'        +detalle.PRECIO     + '},'+
        '{param:"PCANTIDAD",tipo_dato:"NUMBER",tipo_param:"IN",value:'      +detalle.CANTIDAD   + '},'+
        '{param:"PTOTAL",tipo_dato:"NUMBER",tipo_param:"IN",value:'         +detalle.TOTAL      + '},'+
        '{param:"PNOTAS",tipo_dato:"VARCHAR2",tipo_param:"IN",value:"'      +detalle.NOTAS      +'"},'+
        '{param:"PID_PRODUCTO",tipo_dato:"NUMBER",tipo_param:"IN",value:'   +detalle.ID_PRODUCTO+ '},'+
        '{param:"PID_MENU",tipo_dato:"NUMBER",tipo_param:"IN",value:'       +detalle.ID_MENU    + '},'+
        '{param:"PID_PLATO",tipo_dato:"NUMBER",tipo_param:"IN",value:'      +detalle.ID_PLATO   + '},'+
        '{param:"PID_PEDIDO",tipo_dato:"NUMBER",tipo_param:"IN",value:'     +pedidoID           + '}' +
      ']',
      // Headers:
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    );
  }

  actualizarPedido(pedido) {
    return this.http.post(
      // URL
      'http://'+localStorage.getItem('webServiceIP')+':8080/ws-restaurante-siglo-xxi/webresources/listar',
      // Params:
      'procedure=ACTUALIZAR_PEDIDO&package=PKG_PEDIDO&data=['+
        '{param:"PID_PEDIDO",tipo_dato:"NUMBER",tipo_param:"IN",value:"'      +pedido.info.ID_PEDIDO       +'"},'+
        '{param:"PID_ESTADO_PEDIDO",tipo_dato:"NUMBER",tipo_param:"IN",value:'+pedido.info.ID_ESTADO_PEDIDO+ '},'+
        '{param:"PFECHA_PAGO",tipo_dato:"VARCHAR2",tipo_param:"IN",value:"'   +pedido.info.FECHA_PAGO      +'"},'+
        '{param:"PTOTAL",tipo_dato:"NUMBER",tipo_param:"IN",value:'           +pedido.info.TOTAL           + '},'+
        '{param:"PMETODO_PAGO",tipo_dato:"VARCHAR2",tipo_param:"IN",value:"'  +pedido.info.METODO_PAGO     +'"}'+
      ']',
      // Headers:
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    );
  }
}
