import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerOrderDetailPage } from './customer-order-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerOrderDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerOrderDetailPageRoutingModule {}
