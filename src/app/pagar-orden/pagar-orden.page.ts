import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagar-orden',
  templateUrl: './pagar-orden.page.html',
  styleUrls: ['./pagar-orden.page.scss'],
})
export class PagarOrdenPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  irAHome() {
    this.router.navigate(['home']);
  }
}
