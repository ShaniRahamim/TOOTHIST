import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Clients } from './clients';

@NgModule({
  declarations: [
    Clients,
  ],
  imports: [
    IonicPageModule.forChild(Clients),
  ],
  exports: [
    Clients
  ]
})
export class ClientsModule {}
