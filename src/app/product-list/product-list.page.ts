import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductListService } from './product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  categoria: any;
  public productos: any;

  constructor(private productService: ProductListService, private route: ActivatedRoute, private router: Router) { 
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
        console.log(productosAux);
        this.productos = productosAux;
      }
    });
  }
  //Esto es una prueba
  ngOnInit() {
  }

}
