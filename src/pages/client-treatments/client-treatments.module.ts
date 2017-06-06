import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientTreatmentsPage } from './client-treatments';

@NgModule({
  declarations: [
    ClientTreatmentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientTreatmentsPage),
  ],
  exports: [
    ClientTreatmentsPage
  ]
})
export class ClientTreatmentsPageModule {}
