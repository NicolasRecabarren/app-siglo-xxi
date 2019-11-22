import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from './menu.service';
import { AlertController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.page.html',
  styleUrls: ['./menus-list.page.scss'],
})
export class MenusListPage implements OnInit {

  public menus: any;

  constructor(public router: Router, private menuService: MenuService, public alertCtrl: AlertController, public _sanitizer: DomSanitizer) {

    // Vamos a buscar los menús y su detalle de productos correspondiente.
    this.menuService.getMenus().subscribe((responseMenus) => {
      const jsonTextResponse = JSON.stringify(responseMenus);
      const jsonObject = JSON.parse(jsonTextResponse);

      if (jsonObject.msj == 'OK') {
        const menusAux = [];
        jsonObject.resultados.forEach((element, index) => {

          // Recorrido de cada uno de los menús.
          element.forEach((subElement, subIndex) => {
            // Vamos a buscar el detalle de los menús (platos y productos vendibles) y los guardamos en subElement.detalle
            this.menuService.getDetalleMenu(subElement.ID_MENU).subscribe((responseDetalle) => {
              const jsonDetalleMenu = JSON.parse(JSON.stringify(responseDetalle));

              subElement.detalle = [];
              if (jsonDetalleMenu.msj == 'OK') {
                const detalleAux = [];
                jsonDetalleMenu.resultados.forEach( (detalleResponse, i) => {
                  detalleResponse.forEach((detalleObject, detalleIndex) => {
                    detalleAux.push(detalleObject);
                  });
                });
                subElement.detalle = detalleAux;
              }
            });

            if(subElement.IMG_EXTENSION == null || subElement.IMG_EXTENSION == "" || subElement.IMAGEN == null || subElement.IMAGEN == ""){
              subElement.IMAGEN = "../../assets/img/carta-menus.jpg";
            } else {
              subElement.IMAGEN = subElement.IMG_EXTENSION+subElement.IMAGEN
            }

            menusAux.push(subElement);
          });
        });
        this.menus = menusAux;
      }
    });
  }

  ngOnInit() {
  }

  irACarta() {
    this.router.navigate(['carta']);
  }

  irADetallePedido() {
    this.router.navigate(['pedido']);
  }

  async solicitar(event, menu) {
    const alert = await this.alertCtrl.create({
      header: 'Agregar Menú',
      message: '<ul><li>' + (menu.DESCRIPCION).toLowerCase() + '</li></ul><br>A continuación, ingrese la cantidad que desea:',
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
            menu.TIPO_PEDIDO = 'MENU';
            menu.CANTIDAD    = parseInt(alertData.menu_cantidad);
            menu.TOTAL       = parseInt(menu.PRECIO)*parseInt(menu.CANTIDAD);
            menu.NOTAS       = alertData.menu_notas;
            menu.ID_PRODUCTO = 0;
            menu.ID_MENU     = menu.ID_MENU;
            menu.ID_PLATO    = 0;
            pedido.productos.push(menu);

            const subtotal = parseInt(pedido.info.SUBTOTAL) + parseInt(menu.TOTAL);

            pedido.info.SUBTOTAL = subtotal;
            pedido.info.PROPINA  = (subtotal * 0.1).toFixed(0);
            pedido.info.TOTAL    = (subtotal * 1.1).toFixed(0);

            localStorage.setItem('pedido', JSON.stringify(pedido));
            this.alertExitoso();
          }
        }
      ],
      inputs: [{
        name: 'menu_cantidad',
        type: 'text',
        value: 1
      }, {
        name: 'menu_notas',
        type: 'text',
        value: '',
        placeholder: 'Ingresar notas'
      }],
    });

    await alert.present();
  }

  async alertExitoso() {
    const alert = await this.alertCtrl.create({
      header: 'Menú agregado',
      subHeader: '¡Producto agregado!',
      message: 'Recuerde que para visualizar su pedido actual, debe presionar el ícono del carrito situado en la parte inferior izquierda de la pantalla.',
      buttons: ['Continuar']
    });

    await alert.present();
  }

}
