import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from '../pedido/pedido.service';

@Component({
  selector: 'app-pagar-orden',
  templateUrl: './pagar-orden.page.html',
  styleUrls: ['./pagar-orden.page.scss'],
})
export class PagarOrdenPage implements OnInit {
  public pedido: any;

  constructor(public router: Router, private pedidoService: PedidoService) {
    this.pedido = JSON.parse(localStorage.getItem('pedido'));
  }

  ngOnInit() {
  }

  irAHome() {
    this.router.navigate(['home']);
  }

  cambiaMetodoPago($event) {
    const pedido = JSON.parse(localStorage.getItem('pedido'));
    pedido.info.METODO_PAGO = ($event.detail.value).toUpperCase();
    localStorage.setItem('pedido',JSON.stringify(pedido));
  }

  pagarOrden(event, pagarOpcion) {
    const pedido = JSON.parse(localStorage.getItem('pedido'));

    if (pagarOpcion == 'subtotal') {
      pedido.info.TOTAL = pedido.info.SUBTOTAL;
    }

    // Actualizamos el pedido a estado "Pagado".
    pedido.info.ID_ESTADO_PEDIDO = 4;
    
    // Actualizamos la fecha de pago
    let fecha = new Date().toISOString().split('T')[0];
    let fechaArray = fecha.split('-');
    fecha = fechaArray[2]+'/'+(parseInt(fechaArray[1])-1).toString()+'/'+fechaArray[0].substr(2);
    pedido.info.FECHA_PAGO = fecha;

    this.pedidoService.actualizarPedido(pedido).subscribe((response) => {});
    localStorage.setItem('pedido', JSON.stringify(this.pedido));

    if (pedido.info.METODO_PAGO == 'WEBPAY') {
      this.router.navigate(['pagar-orden-webpay']);
    } else {
      this.router.navigate(['pagar-orden-qr']);
    }
  }
}