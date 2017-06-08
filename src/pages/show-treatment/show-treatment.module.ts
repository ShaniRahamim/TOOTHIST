import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowTreatmentPage } from './show-treatment';

@NgModule({
  declarations: [
    ShowTreatmentPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowTreatmentPage),
  ],
  exports: [
    ShowTreatmentPage
  ]
})
export class ShowTreatmentPageModule {}
