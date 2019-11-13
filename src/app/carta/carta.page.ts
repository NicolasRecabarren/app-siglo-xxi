import { Component, OnInit } from '@angular/core';
import { CartaService } from './carta.service';
import { catchError } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.page.html',
  styleUrls: ['./carta.page.scss'],
})
export class CartaPage implements OnInit {

  public categorias: any;

  constructor(private cartaService: CartaService, public navCtrl: NavController, public router: Router) {
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

    this.cartaService.getCarta().subscribe((response) => {
      const jsonTextResponse = JSON.stringify(response);
      const jsonObject = JSON.parse(jsonTextResponse);

      if (jsonObject.msj == 'OK') {
        const categoriasAux = [];
        jsonObject.resultados.forEach((element, index) => {
          element.forEach((subElement, subIndex) => {
            categoriasAux.push(subElement);
          });
        });

        this.categorias = categoriasAux;
      }
    });
  }

  ir_a_listar_productos(event, categoriaParam) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        categoria: JSON.stringify(categoriaParam)
      }
    };
    this.router.navigate(['product-list'], navigationExtras);
  }

  irADetallePedido() {
    this.router.navigate(['pedido']);
  }

  irAHome() {
    this.router.navigate(['home']);
  }

  irAListaMenus() {
    this.router.navigate(['menus-list']);
  }

  irAListaBebestibles() {
    this.router.navigate(['bebestibles-list']);
  }

  ngOnInit() { }
}
