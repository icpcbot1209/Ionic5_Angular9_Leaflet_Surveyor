import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TargetPageRoutingModule } from './target-routing.module';
import { TargetPage } from './target.page';

import { CamviewComponent } from "./camview/camview.component";
import { MapviewComponent } from './mapview/mapview.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TargetPageRoutingModule],
  declarations: [TargetPage, CamviewComponent, MapviewComponent],
})
export class TargetPageModule {}
