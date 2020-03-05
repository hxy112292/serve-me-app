import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressChoosePage } from './address-choose.page';

const routes: Routes = [
  {
    path: '',
    component: AddressChoosePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressChoosePageRoutingModule {}
