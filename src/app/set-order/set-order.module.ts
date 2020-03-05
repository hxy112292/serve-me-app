import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetOrderPageRoutingModule } from './set-order-routing.module';

import { SetOrderPage } from './set-order.page';
import {StarRatingModule} from 'ionic4-star-rating';
import {AddressChoosePageModule} from './address-choose/address-choose.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SetOrderPageRoutingModule,
        StarRatingModule,
        AddressChoosePageModule
    ],
  declarations: [SetOrderPage]
})
export class SetOrderPageModule {}
