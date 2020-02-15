import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorServicePageRoutingModule } from './vendor-service-routing.module';

import { VendorServicePage } from './vendor-service.page';
import {StarRatingModule} from 'ionic4-star-rating';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VendorServicePageRoutingModule,
        StarRatingModule
    ],
  declarations: [VendorServicePage]
})
export class VendorServicePageModule {}
