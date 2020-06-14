import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TargetlistPageRoutingModule } from './targetlist-routing.module';

import { TargetlistPage } from './targetlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TargetlistPageRoutingModule
  ],
  declarations: [TargetlistPage]
})
export class TargetlistPageModule {}
