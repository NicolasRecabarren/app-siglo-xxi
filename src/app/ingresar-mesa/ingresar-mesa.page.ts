import { Component, OnInit } from '@angular/core';
import { IngresarMesaService } from './ingresar-mesa.service';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-ingresar-mesa',
  templateUrl: './ingresar-mesa.page.html',
  styleUrls: ['./ingresar-mesa.page.scss'],
})
export class IngresarMesaPage implements OnInit {

  public num_mesa: any;

  constructor(private mesaService: IngresarMesaService, public router: Router, public alertCtrl: AlertController) {
    localStorage.clear();
    localStorage.setItem('webServiceIP','25.101.150.208');
  }

  recuperar_pedido() {
    // Validamos que ingrese un número de mesa.
    if (this.num_mesa == '' || this.num_mesa == null) {
      this.mensajePedidoError('Por favor ingrese un número de mesa.');
      return false;
    }

    this.mesaService.getPedido(this.num_mesa).subscribe((response) => {
      const jsonTextResponse = JSON.stringify(response);
      const jsonObject = JSON.parse(jsonTextResponse);

      if (jsonObject.msj == 'OK') {
        let pedido = {
          encontrado: false,
          info: {SUBTOTAL:0,PROPINA:0},
          productos: []
        };
        jsonObject.resultados.forEach((element, index) => {
          if (element.length == 0) {
            this.mensajePedidoError();
            return false;
          }

          pedido.encontrado = true;
          element.forEach((subElement, subIndex) => {
            pedido.info = subElement;
          });
        });

        if (pedido.encontrado) {
          pedido.info.SUBTOTAL = 0;
          pedido.info.PROPINA = 0;

          localStorage.setItem('pedido', JSON.stringify(pedido));
          this.router.navigate(['carta']);
        }
      }
    });
  }

  async mensajePedidoError(mensaje = '') {
    mensaje = mensaje || 'La mesa no se ha asignado a ningún pedido, <b>verifique el número ingresado</b> o <b>contacte a un garzón</b>.';
    const alert = await this.alertCtrl.create({
      header: 'Pedido no encontrado',
      message: mensaje,
      buttons: [{text: 'Aceptar'}]
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
