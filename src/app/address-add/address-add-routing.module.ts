import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressAddPage } from './address-add.page';

const routes: Routes = [
  {
    path: '',
    component: AddressAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressAddPageRoutingModule {}
