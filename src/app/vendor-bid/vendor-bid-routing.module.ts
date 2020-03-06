import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorBidPage } from './vendor-bid.page';

const routes: Routes = [
  {
    path: '',
    component: VendorBidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorBidPageRoutingModule {}
