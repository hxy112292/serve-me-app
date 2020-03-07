import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerCenterPage } from './customer-center.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerCenterPageRoutingModule {}
