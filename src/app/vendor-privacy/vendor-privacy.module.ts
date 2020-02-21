import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorPrivacyPageRoutingModule } from './vendor-privacy-routing.module';

import { VendorPrivacyPage } from './vendor-privacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorPrivacyPageRoutingModule
  ],
  declarations: [VendorPrivacyPage]
})
export class VendorPrivacyPageModule {}
