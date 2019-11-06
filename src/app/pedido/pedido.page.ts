import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoService } from './pedido.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  public pedido: any;

  constructor(public router: Router, private pedidoService: PedidoService, private alertCtrl: AlertController) {
    this.pedido = JSON.parse(localStorage.getItem('pedido'));
  }

  ngOnInit() {
  }

  irAHome() {
    this.router.navigate(['home']);
  }

  enviarACocina() {
    if(this.pedido.info.ID_ESTADO_PEDIDO == 2){
      this.mensajePedidoYaActualizado();
    } else {
      this.pedidoService.actualizarEstadoPedido(this.pedido.info.ID_PEDIDO, 2).subscribe((response) => {
        const jsonObject = JSON.parse(JSON.stringify(response));
  
        if (jsonObject.msj == 'OK') {
          this.pedido.info.ID_ESTADO_PEDIDO = 2;
          localStorage.setItem('pedido', JSON.stringify(this.pedido));
  
          this.pedido.productos.forEach((detalle, index) => {
            this.pedidoService.ingresarDetalle(detalle,this.pedido.info.ID_PEDIDO).subscribe((response) => {});
          });
  
          this.mensajePedidoActualizado();
          this.router.navigate(['home']);
        } else {
          this.mensajeError();
        }
      });
    }
  }

  async mensajePedidoActualizado() {
    const alert = await this.alertCtrl.create({
      header: '¡Orden enviada!',
      message: 'Nuestros cocineros han recibido su pedido. Ahora solo queda esperar.',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async mensajePedidoYaActualizado() {
    const alert = await this.alertCtrl.create({
      header: '¡Orden ya enviada!',
      message: 'Nuestros cocineros ya han recibido su pedido. Favor sea paciente o contacte a uno de nuestros garzones.',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async mensajeError() {
    const alert = await this.alertCtrl.create({
      header: '¡Ups! Ha ocurrido un problema.',
      message: 'Nuestros cocineros no pudieron recibir su pedido. Favor contacte a un garzón.',
      buttons: ['Ok']
    });

    await alert.present();
  }
}
