import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditClient } from './edit-client';

@NgModule({
  declarations: [
    EditClient,
  ],
  imports: [
    IonicPageModule.forChild(EditClient),
  ],
  exports: [
    EditClient
  ]
})
export class EditClientModule {}
