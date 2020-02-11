import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderUpdatePage } from './order-update.page';

const routes: Routes = [
  {
    path: '',
    component: OrderUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderUpdatePageRoutingModule {}
