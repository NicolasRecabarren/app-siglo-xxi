import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(public router: Router, public alertCtrl: AlertController) {
    //localStorage.clear();
    let pedido = JSON.parse(localStorage.getItem('pedido'));
    if (pedido == null) {
      pedido = {
        info: {
          subtotal: 0,
          propina: 0,
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

  async irAPedido() {
    let pedido = JSON.parse(localStorage.getItem('pedido'));
    if (pedido.productos == null || pedido.productos.length == 0) {
      const alert = await this.alertCtrl.create({
        header: 'Orden no disponible',
        message: 'Usted aún no ha solicitado ningún producto.',
        buttons: ['Ok']
      });
      await alert.present();
    } else {
      this.router.navigate(['pedido']);
    }
  }

  async irAPagarOrden() {
    const pedido = JSON.parse(localStorage.getItem('pedido'));
    if (pedido.productos == null || pedido.productos.length == 0) {
      const alert = await this.alertCtrl.create({
        header: 'Orden no disponible',
        message: 'Usted aún no ha solicitado ningún producto.',
        buttons: ['Ok']
      });
      await alert.present();

    } else if (pedido.info.ID_ESTADO_PEDIDO == 1 /*|| pedido.info.ID_ESTADO_PEDIDO == 2*/) {
      const alert = await this.alertCtrl.create({
        header: 'Pagar Orden No Disponible',
        message: 'No se puede pagar la orden debido a que aún no se envía a los cocineros o no se encuentran los productos en su mesa.',
        buttons: ['Ok']
      });
      await alert.present();

    } else {
      this.router.navigate(['pagar-orden']);
    }
  }

  async llamarGarzon() {
    const alert = await this.alertCtrl.create({
      header: '¡Garzón llamado!',
      message: 'Un garzón estará en su mesa en breve.',
      buttons: ['Ok']
    });

    await alert.present();
  }
}
