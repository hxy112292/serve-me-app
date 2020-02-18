import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorCenterPage } from './vendor-center.page';

const routes: Routes = [
  {
    path: '',
    component: VendorCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorCenterPageRoutingModule {}
