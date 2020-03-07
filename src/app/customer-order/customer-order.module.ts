import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerOrderPageRoutingModule } from './customer-order-routing.module';

import { CustomerOrderPage } from './customer-order.page';
import {StarRatingModule} from 'ionic4-star-rating';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CustomerOrderPageRoutingModule,
        StarRatingModule
    ],
    exports: [
        CustomerOrderPage
    ],
    declarations: [CustomerOrderPage]
})
export class CustomerOrderPageModule {}
