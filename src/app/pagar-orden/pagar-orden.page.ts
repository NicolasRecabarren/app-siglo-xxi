import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagar-orden',
  templateUrl: './pagar-orden.page.html',
  styleUrls: ['./pagar-orden.page.scss'],
})
export class PagarOrdenPage implements OnInit {
  public pedido: any;

  constructor(public router: Router) {
    this.pedido = JSON.parse(localStorage.getItem('pedido'));
  }

  ngOnInit() {
  }

  irAHome() {
    this.router.navigate(['home']);
  }

  pagarOrden(event, pagarOpcion) {
    const pedido = JSON.parse(localStorage.getItem('pedido'));
    let monto = pedido.info.total;
    if (pagarOpcion == 'subtotal') {
      monto = pedido.info.subtotal;
    }

    pedido.info.forma_pago = 2;
    if (pedido.info.forma_pago == 1) {
      this.router.navigate(['pagar-orden-webpay']);
    } else {
      this.router.navigate(['pagar-orden-qr']);
    }
  }
}
