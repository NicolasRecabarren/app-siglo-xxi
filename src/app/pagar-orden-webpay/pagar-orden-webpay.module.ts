import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagarOrdenWebpayPage } from './pagar-orden-webpay.page';

const routes: Routes = [
  {
    path: '',
    component: PagarOrdenWebpayPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PagarOrdenWebpayPage]
})
export class PagarOrdenWebpayPageModule {}
