import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorBidPageRoutingModule } from './vendor-bid-routing.module';

import { VendorBidPage } from './vendor-bid.page';
import {StarRatingModule} from 'ionic4-star-rating';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VendorBidPageRoutingModule,
        StarRatingModule
    ],
    exports: [
        VendorBidPage
    ],
    declarations: [VendorBidPage]
})
export class VendorBidPageModule {}
