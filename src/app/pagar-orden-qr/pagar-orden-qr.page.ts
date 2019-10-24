import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagar-orden-qr',
  templateUrl: './pagar-orden-qr.page.html',
  styleUrls: ['./pagar-orden-qr.page.scss'],
})
export class PagarOrdenQrPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  irAHome() {
    this.router.navigate(['home']);
  }

  irAIngreso() {
    localStorage.clear();
    this.router.navigate(['home']);
  }
}
