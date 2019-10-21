import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {

  public pedido: any;

  constructor(public router: Router) {
    this.pedido = JSON.parse(localStorage.getItem('pedido'));
    console.log(this.pedido);
    //Si se quiere limpiar lo que hay en local storage, agregar lo siguiente (Se podría usar en un botón llamado "Reiniciar pedido", o "Limpiar pedido", o algo así)
    //localStorage.clear();
  }

  ngOnInit() {
  }

  irAHome() {
    this.router.navigate(['home']);
  }
}
