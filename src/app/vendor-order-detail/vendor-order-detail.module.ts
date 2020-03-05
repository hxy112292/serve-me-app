import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorOrderDetailPageRoutingModule } from './vendor-order-detail-routing.module';

import { VendorOrderDetailPage } from './vendor-order-detail.page';
import {StarRatingModule} from 'ionic4-star-rating';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VendorOrderDetailPageRoutingModule,
        StarRatingModule
    ],
  declarations: [VendorOrderDetailPage]
})
export class VendorOrderDetailPageModule {}
