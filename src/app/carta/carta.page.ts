import { Component, OnInit } from '@angular/core';
import { CartaService } from './carta.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.page.html',
  styleUrls: ['./carta.page.scss'],
})
export class CartaPage implements OnInit {

  public categorias: any;

  constructor(private cartaService: CartaService) {
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
        console.log(categoriasAux);
        this.categorias = categoriasAux;
      }
    });
  }

  ngOnInit() { }
}
