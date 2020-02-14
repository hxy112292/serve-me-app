import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorOrderDetailPageRoutingModule } from './vendor-order-detail-routing.module';

import { VendorOrderDetailPage } from './vendor-order-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorOrderDetailPageRoutingModule
  ],
  declarations: [VendorOrderDetailPage]
})
export class VendorOrderDetailPageModule {}
