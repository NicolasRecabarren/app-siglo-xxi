import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public links = [{
    name: 'Ver carta',
    onClickEvent: 'irACarta',
    image: 'home-plato_cubiertos.jpg'
  }, {
    name: 'Ver mi orden',
    onClickEvent: 'irAPedido',
    image: 'home-cocina_chef.jpg'
  }, {
    name: 'Pagar orden',
    onClickEvent: 'irAPagarOrden',
    image: 'home-dinero_cash.jpg'
  }, {
    name: 'Llamar garzón',
    onClickEvent: 'llamarGarzon',
    image: 'home-garzon.jpg'
  }];

  constructor(public router: Router) {
    localStorage.clear();
    let pedido = JSON.parse(localStorage.getItem('pedido'));
    if (pedido == null) {
      pedido = {
        info: {
          subtotal: 0,
          total: 0
        },
        productos: []
      };

      localStorage.setItem('pedido', JSON.stringify(pedido));
    }
  }

  ngOnInit() {
  }

  irACarta() {
    this.router.navigate(['carta']);
  }

  irAPedido() {
    this.router.navigate(['pedido']);
  }

  irAPagarOrden() {
    this.router.navigate(['pagar-orden']);
  }

  llamarGarzon() {
    console.log("holi");
  }
}
