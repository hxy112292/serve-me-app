import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorServiceUpdatePage } from './vendor-service-update.page';

const routes: Routes = [
  {
    path: '',
    component: VendorServiceUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorServiceUpdatePageRoutingModule {}
