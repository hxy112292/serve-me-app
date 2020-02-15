import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorServiceUpdatePageRoutingModule } from './vendor-service-update-routing.module';

import { VendorServiceUpdatePage } from './vendor-service-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorServiceUpdatePageRoutingModule
  ],
  declarations: [VendorServiceUpdatePage]
})
export class VendorServiceUpdatePageModule {}
