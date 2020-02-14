import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderReviewPageRoutingModule } from './order-review-routing.module';

import { OrderReviewPage } from './order-review.page';
import {StarRatingModule} from 'ionic4-star-rating';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        OrderReviewPageRoutingModule,
        StarRatingModule
    ],
  declarations: [OrderReviewPage]
})
export class OrderReviewPageModule {}
