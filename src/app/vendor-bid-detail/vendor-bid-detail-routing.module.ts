import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorBidDetailPage } from './vendor-bid-detail.page';

const routes: Routes = [
  {
    path: '',
    component: VendorBidDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorBidDetailPageRoutingModule {}
