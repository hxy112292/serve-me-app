import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressChoosePageRoutingModule } from './address-choose-routing.module';

import { AddressChoosePage } from './address-choose.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressChoosePageRoutingModule
  ],
  declarations: [AddressChoosePage],
  entryComponents: [AddressChoosePage],
})
export class AddressChoosePageModule {}
