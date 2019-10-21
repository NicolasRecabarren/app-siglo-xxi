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

  solicitar(event, producto) {
    let pedido = JSON.parse(localStorage.getItem('pedido'));
    if (pedido.productos == null) {
      pedido.productos = [];
    }
    pedido.productos.push(producto);

    const subtotal = parseInt(pedido.info.subtotal) + parseInt(producto.PRECIO);

    pedido.info.subtotal = subtotal;
    pedido.info.total = subtotal * 1.1;

    localStorage.setItem('pedido', JSON.stringify(pedido));
    this.alertExitoso();
  }

  async alertExitoso(){
    const alert = await this.alertCtrl.create({
      header: 'Plato agregado',
      subHeader: 'El plato ha sido agregado a su pedido exitosamente',
      message: 'Para visualizar su pedido actual, diríjase a opción "Mi Pedido".',
      buttons: ['OK']
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
