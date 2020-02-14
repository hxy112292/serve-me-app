import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchVendorPageRoutingModule } from './search-vendor-routing.module';

import { SearchVendorPage } from './search-vendor.page';
import {StarRatingModule} from 'ionic4-star-rating';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SearchVendorPageRoutingModule,
        StarRatingModule
    ],
  declarations: [SearchVendorPage]
})
export class SearchVendorPageModule {}
