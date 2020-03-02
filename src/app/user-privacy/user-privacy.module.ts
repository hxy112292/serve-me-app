import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPrivacyPageRoutingModule } from './user-privacy-routing.module';

import { UserPrivacyPage } from './user-privacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPrivacyPageRoutingModule
  ],
  declarations: [UserPrivacyPage]
})
export class UserPrivacyPageModule {}
