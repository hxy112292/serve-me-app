import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorPrivacyPage } from './vendor-privacy.page';

const routes: Routes = [
  {
    path: '',
    component: VendorPrivacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorPrivacyPageRoutingModule {}
