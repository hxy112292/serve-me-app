import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderReviewPage } from './order-review.page';

const routes: Routes = [
  {
    path: '',
    component: OrderReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderReviewPageRoutingModule {}
