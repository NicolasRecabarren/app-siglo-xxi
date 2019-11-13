import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductListService } from './product-list.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  categoria: any;
  public productos: any;
  public productosFiltrados: any;
  public productosSolicitados: any;

  // tslint:disable-next-line: max-line-length
  constructor(private productService: ProductListService, private route: ActivatedRoute, private router: Router, public alertCtrl: AlertController) {
    this.productosSolicitados = JSON.parse(localStorage.getItem('pedido'));
    if (!this.productosSolicitados) {
      this.productosSolicitados = [];
    }
    this.route.queryParams.subscribe(params => {
      this.categoria = JSON.parse(params.categoria);
    });

    this.productService.getProductos().subscribe((response) => {
      const jsonTextResponse = JSON.stringify(response);
      const jsonObject = JSON.parse(jsonTextResponse);

      if (jsonObject.msj == 'OK') {
        const productosAux = [];
        jsonObject.resultados.forEach((element, index) => {
          element.forEach((subElement, subIndex) => {
            productosAux.push(subElement);
          });
        });

        this.productos = productosAux;
        this.productosFiltrados = this.productos.filter( producto => {
          return producto.ID_CATEGORIA_PLATO == this.categoria.ID_CATEGORIA_PLATO;
        });
      }
    });
  }

  async solicitar(event, producto) {
    const alert = await this.alertCtrl.create({
      header: 'Agregar Producto',
      message: '<ul><li>' + (producto.DESCRIPCION).toLowerCase() + '</li></ul><br>A continuación, ingrese la cantidad que desea:',
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
            producto.TIPO_PEDIDO = 'PLATO';
            producto.CANTIDAD    = parseInt(alertData.producto_cantidad);
            producto.TOTAL       = parseInt(producto.PRECIO)*parseInt(producto.CANTIDAD);
            producto.NOTAS       = alertData.producto_notas;
            producto.ID_PRODUCTO = 0;
            producto.ID_MENU     = 0;
            producto.ID_PLATO    = producto.ID_PLATO;
            pedido.productos.push(producto);

            const subtotal = parseInt(pedido.info.SUBTOTAL) + parseInt(producto.TOTAL);

            pedido.info.SUBTOTAL = subtotal;
            pedido.info.PROPINA  = (subtotal * 0.1).toFixed(0);
            pedido.info.TOTAL    = (subtotal * 1.1).toFixed(0);

            localStorage.setItem('pedido', JSON.stringify(pedido));
            this.alertExitoso();
          }
        }
      ],
      inputs: [{
        name: 'producto_cantidad',
        type: 'text',
        value: 1
      }, {
        name: 'producto_notas',
        type: 'text',
        value: '',
        placeholder: 'Ingresar notas'
      }],
    });

    await alert.present();
  }

  async alertExitoso() {
    const alert = await this.alertCtrl.create({
      header: 'Plato agregado',
      subHeader: '¡Producto agregado!',
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
