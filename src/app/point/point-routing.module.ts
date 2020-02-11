import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PointPage } from './point.page';

const routes: Routes = [
  {
    path: '',
    component: PointPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointPageRoutingModule {}
