import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'carta',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'product-list', loadChildren: './product-list/product-list.module#ProductListPageModule' },
  { path: 'carta', loadChildren: './carta/carta.module#CartaPageModule' },
  { path: 'pagar-orden', loadChildren: './pagar-orden/pagar-orden.module#PagarOrdenPageModule' },
  { path: 'menus-list', loadChildren: './menus-list/menus-list.module#MenusListPageModule' },  { path: 'ingresar-mesa', loadChildren: './ingresar-mesa/ingresar-mesa.module#IngresarMesaPageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
