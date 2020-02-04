import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchVendorPage } from './search-vendor.page';

const routes: Routes = [
  {
    path: '',
    component: SearchVendorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchVendorPageRoutingModule {}
