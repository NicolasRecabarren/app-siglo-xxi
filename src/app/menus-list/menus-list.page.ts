import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menus-list',
  templateUrl: './menus-list.page.html',
  styleUrls: ['./menus-list.page.scss'],
})
export class MenusListPage implements OnInit {

  public menus: any;

  constructor(public router: Router, private menuService: MenuService) {

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

  solicitar(event, menu) {

  }
}
