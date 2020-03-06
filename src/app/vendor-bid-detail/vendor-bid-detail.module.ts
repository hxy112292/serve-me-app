import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorBidDetailPageRoutingModule } from './vendor-bid-detail-routing.module';

import { VendorBidDetailPage } from './vendor-bid-detail.page';
import {StarRatingModule} from 'ionic4-star-rating';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VendorBidDetailPageRoutingModule,
        StarRatingModule
    ],
  declarations: [VendorBidDetailPage]
})
export class VendorBidDetailPageModule {}
