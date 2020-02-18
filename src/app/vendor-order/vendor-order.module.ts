import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorOrderPageRoutingModule } from './vendor-order-routing.module';

import { VendorOrderPage } from './vendor-order.page';
import {StarRatingModule} from 'ionic4-star-rating';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VendorOrderPageRoutingModule,
        StarRatingModule
    ],
    exports: [
        VendorOrderPage
    ],
    declarations: [VendorOrderPage]
})
export class VendorOrderPageModule {}
