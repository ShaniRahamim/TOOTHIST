import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TreatmentPage } from './treatment';

@NgModule({
  declarations: [
    TreatmentPage,
  ],
  imports: [
    IonicPageModule.forChild(TreatmentPage),
  ],
  exports: [
    TreatmentPage
  ]
})
export class TreatmentPageModule {}
