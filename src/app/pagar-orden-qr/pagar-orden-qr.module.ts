import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagarOrdenQrPage } from './pagar-orden-qr.page';

const routes: Routes = [
  {
    path: '',
    component: PagarOrdenQrPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PagarOrdenQrPage]
})
export class PagarOrdenQrPageModule {}
