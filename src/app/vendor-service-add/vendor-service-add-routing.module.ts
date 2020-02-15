import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorServiceAddPage } from './vendor-service-add.page';

const routes: Routes = [
  {
    path: '',
    component: VendorServiceAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorServiceAddPageRoutingModule {}
