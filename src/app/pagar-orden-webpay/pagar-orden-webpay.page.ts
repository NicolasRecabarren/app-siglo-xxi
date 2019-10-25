import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagar-orden-webpay',
  templateUrl: './pagar-orden-webpay.page.html',
  styleUrls: ['./pagar-orden-webpay.page.scss'],
})
export class PagarOrdenWebpayPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  irAHome() {
    this.router.navigate(['home']);
  }

  irAIngreso() {
    this.router.navigate(['ingresar-mesa']);
  }
}
