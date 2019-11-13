import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BebestiblesListPage } from './bebestibles-list.page';

const routes: Routes = [
  {
    path: '',
    component: BebestiblesListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BebestiblesListPage]
})
export class BebestiblesListPageModule {}
