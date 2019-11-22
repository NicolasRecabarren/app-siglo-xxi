import { Component, OnInit } from '@angular/core';
import { BebestiblesService } from './bebestibles.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-bebestibles-list',
  templateUrl: './bebestibles-list.page.html',
  styleUrls: ['./bebestibles-list.page.scss'],
})
export class BebestiblesListPage implements OnInit {

  public bebestibles: any;
  public categoriasVendibles: any;

  // tslint:disable-next-line: max-line-length
  constructor(private bebestiblesService: BebestiblesService, private alert: AlertController, private route: ActivatedRoute, private router: Router, public _sanitizer: DomSanitizer) {

    // Vamos a buscar las categorías vendibles de los productos.
    this.bebestiblesService.getCategoriasBebestibles().subscribe((response) => {
      const jsonTextResponse2 = JSON.stringify(response);
      const jsonObject2 = JSON.parse(jsonTextResponse2);

      if (jsonObject2.msj == 'OK') {
        const categoriasAux = [];
        jsonObject2.resultados.forEach((element, index) => {
          element.forEach((subElement, subIndex) => {
            if (subElement.ES_VENDIBLE == 1) {
              categoriasAux.push(subElement.ID_CATEGORIA_PRODUCTO);
            }
          });
        });

        this.categoriasVendibles = categoriasAux;
        this.bebestiblesService.getBebestibles().subscribe((response) => {
          const jsonTextResponse = JSON.stringify(response);
          const jsonObject = JSON.parse(jsonTextResponse);

          if (jsonObject.msj == 'OK') {
            const bebestiblesAux = [];
            jsonObject.resultados.forEach((element, index) => {
              element.forEach((subElement, subIndex) => {
                if (this.categoriasVendibles.indexOf(subElement.ID_CATEGORIA) != -1) {
                  
                  if(subElement.IMG_EXTENSION == null || subElement.IMG_EXTENSION == "" || subElement.IMAGEN == null || subElement.IMAGEN == ""){
                    subElement.IMAGEN = "../../assets/img/icono-no-imagen.png";
                  } else {
                    subElement.IMAGEN = subElement.IMG_EXTENSION+subElement.IMAGEN
                  }

                  bebestiblesAux.push(subElement);
                }
              });
            });

            this.bebestibles = bebestiblesAux;
          }
        });
      }
    });
  }

  async solicitar(event, bebestible) {
    const alert = await this.alert.create({
      header: 'Agregar Bebestible',
      message: '<ul><li>' + (bebestible.DESCRIPCION).toLowerCase() + '</li></ul><br>A continuación, ingrese la cantidad que desea:',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        }, {
          text: 'Confirmar',
          handler: (alertData) => {

            let pedido = JSON.parse(localStorage.getItem('pedido'));
            if (pedido.productos == null) {
              pedido.productos = [];
            }
            bebestible.TIPO_PEDIDO = 'PRODUCTO';
            bebestible.CANTIDAD    = parseInt(alertData.bebestible_cantidad);
            bebestible.TOTAL       = parseInt(bebestible.PRECIO_UNITARIO)*parseInt(bebestible.CANTIDAD);
            bebestible.NOTAS       = alertData.bebestible_notas;
            bebestible.ID_PRODUCTO = bebestible.ID_PRODUCTO;
            bebestible.ID_MENU     = 0;
            bebestible.ID_PLATO    = 0;
            pedido.productos.push(bebestible);

            const subtotal = parseInt(pedido.info.SUBTOTAL) + parseInt(bebestible.TOTAL);

            pedido.info.SUBTOTAL = subtotal;
            pedido.info.PROPINA  = (subtotal * 0.1).toFixed(0);
            pedido.info.TOTAL    = (subtotal * 1.1).toFixed(0);

            localStorage.setItem('pedido', JSON.stringify(pedido));
            this.alertExitoso();
          }
        }
      ],
      inputs: [{
        name: 'bebestible_cantidad',
        type: 'text',
        value: 1
      }, {
        name: 'bebestible_notas',
        type: 'text',
        value: '',
        placeholder: 'Ingresar notas'
      }],
    });

    await alert.present();
  }

  async alertExitoso() {
    const alert = await this.alert.create({
      header: 'Bebestible agregado',
      subHeader: '¡Bebestible agregado!',
      message: 'Recuerde que para visualizar su pedido actual, debe presionar el ícono del carrito situado en la parte inferior izquierda de la pantalla.',
      buttons: ['Continuar']
    });

    await alert.present();
  }

  irADetallePedido() {
    this.router.navigate(['pedido']);
  }

  irACarta() {
    this.router.navigate(['carta']);
  }

  ngOnInit() {
  }

}
