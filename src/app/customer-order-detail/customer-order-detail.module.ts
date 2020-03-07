import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerOrderDetailPageRoutingModule } from './customer-order-detail-routing.module';

import { CustomerOrderDetailPage } from './customer-order-detail.page';
import {StarRatingModule} from 'ionic4-star-rating';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CustomerOrderDetailPageRoutingModule,
        StarRatingModule
    ],
  declarations: [CustomerOrderDetailPage]
})
export class CustomerOrderDetailPageModule {}
