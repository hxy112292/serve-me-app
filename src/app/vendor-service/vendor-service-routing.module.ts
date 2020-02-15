import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorServicePage } from './vendor-service.page';

const routes: Routes = [
  {
    path: '',
    component: VendorServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorServicePageRoutingModule {}
