import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    let monto = pedido.info.TOTAL;
    if (pagarOpcion == 'subtotal') {
      monto = pedido.info.TOTAL;
    }

    if (pedido.info.METODO_PAGO == 'WEBPAY') {
      this.router.navigate(['pagar-orden-webpay']);
    } else {
      this.router.navigate(['pagar-orden-qr']);
    }
  }
}