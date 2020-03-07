import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerOrderPage } from './customer-order.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerOrderPageRoutingModule {}
