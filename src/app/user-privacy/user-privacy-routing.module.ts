import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserPrivacyPage } from './user-privacy.page';

const routes: Routes = [
  {
    path: '',
    component: UserPrivacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPrivacyPageRoutingModule {}
