import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ingresar-mesa',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { path: 'ingresar-mesa', loadChildren: './ingresar-mesa/ingresar-mesa.module#IngresarMesaPageModule' },
  { path: 'product-list', loadChildren: './product-list/product-list.module#ProductListPageModule' },
  { path: 'carta', loadChildren: './carta/carta.module#CartaPageModule' },
  { path: 'pagar-orden', loadChildren: './pagar-orden/pagar-orden.module#PagarOrdenPageModule' },
  { path: 'menus-list', loadChildren: './menus-list/menus-list.module#MenusListPageModule' },
  { path: 'pedido', loadChildren: './pedido/pedido.module#PedidoPageModule' },
  { path: 'pagar-orden-webpay', loadChildren: './pagar-orden-webpay/pagar-orden-webpay.module#PagarOrdenWebpayPageModule' },
  { path: 'pagar-orden-qr', loadChildren: './pagar-orden-qr/pagar-orden-qr.module#PagarOrdenQrPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
