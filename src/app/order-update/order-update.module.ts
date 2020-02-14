import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderUpdatePageRoutingModule } from './order-update-routing.module';

import { OrderUpdatePage } from './order-update.page';
import {StarRatingModule} from 'ionic4-star-rating';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OrderUpdatePageRoutingModule,
        StarRatingModule
    ],
  declarations: [OrderUpdatePage]
})
export class OrderUpdatePageModule {}
