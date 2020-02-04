import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetOrderPage } from './set-order.page';

const routes: Routes = [
  {
    path: '',
    component: SetOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetOrderPageRoutingModule {}
