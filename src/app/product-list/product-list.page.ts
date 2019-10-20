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

  constructor(private productService: ProductListService, private route: ActivatedRoute, private router: Router, public alertCtrl: AlertController) {
    this.productosSolicitados = JSON.parse(localStorage.getItem("pedido"));
    if(!this.productosSolicitados) {
      this.productosSolicitados = []; 
    }
    this.route.queryParams.subscribe(params => {
      console.log(params);
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
        //console.log(productosAux);
        this.productos = productosAux;
        this.productosFiltrados = this.productos.filter( producto => {
          return producto.ID_CATEGORIA_PLATO == this.categoria.ID_CATEGORIA_PLATO;
        });
        console.log(this.productosFiltrados);
      }
    });
  }

  solicitar(event, producto) {
    this.productosSolicitados.push(producto);
    var productosAGuardar = JSON.stringify(this.productosSolicitados);
    localStorage.setItem("pedido", productosAGuardar);

    //Como recuperar la variable "pedido" desde local storage:
    //var pedidoProductosAux = localStorage.getItem("pedido");
    //var pedidoProductos = JSON.parse(pedidoProductosAux);
    //console.log(pedidoProductos);
    this.alertExitoso();

    //Si se quiere limpiar lo que hay en local storage, agregar lo siguiente (Se podría usar en un botón llamado "Reiniciar pedido", o "Limpiar pedido", o algo así)
    //localStorage.clear();
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

  //Esto es una prueba
  ngOnInit() {
  }

}
