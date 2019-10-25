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

  num_mesa : any;
  
  constructor(private mesaService: IngresarMesaService, public router: Router, public alertCtrl: AlertController) { }

  recuperar_pedido(){

    this.mesaService.getPedido(this.num_mesa).subscribe((response) => {
      const jsonTextResponse = JSON.stringify(response);
      const jsonObject = JSON.parse(jsonTextResponse);

      if (jsonObject.msj == 'OK') {
        const pedido = [];
        jsonObject.resultados.forEach((element, index) => {
          element.forEach((subElement, subIndex) => {
            pedido.push(subElement);
          });
        });

        console.log("Pedido recuperado desde base de datos:");
        console.log(pedido);

        if(pedido.length > 0){
          console.log("Pedido encontrado");
          localStorage.setItem('pedido_cabecera', JSON.stringify(pedido));
          console.log("Guardado en localstorage");
          this.router.navigate(['carta']);
          /*console.log("Recuperando desde localstorage:");
          var pedido_cabecera = JSON.parse(localStorage.getItem('pedido_cabecera'));
          console.log(pedido_cabecera);*/
        } else {
          console.log("Pedido no encontrado");
          this.mensajePedidoError();
        }
      }
    });
  }

  async mensajePedidoError() {
    const alert = await this.alertCtrl.create({
      header: 'Pedido no encontrado',
      message: 'La mesa no tiene ningún pedido asociado. Verifique que la mesa haya sido asignada correctamente, o ingrese otro N° de mesa.',
      buttons: [
        {
          text: 'Aceptar'
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
  }

}
