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

    let monto = pedido.info.TOTAL;
    if (pagarOpcion == 'subtotal') {
      monto = pedido.info.SUBTOTAL;
    }

    // Actualizamos el pedido a estado "Pagado".
    pedido.info.ID_ESTADO_PEDIDO = 4;

    this.pedidoService.actualizarPedido(pedido).subscribe((response) => {});

    if (pedido.info.METODO_PAGO == 'WEBPAY') {
      this.router.navigate(['pagar-orden-webpay']);
    } else {
      this.router.navigate(['pagar-orden-qr']);
    }
  }
}