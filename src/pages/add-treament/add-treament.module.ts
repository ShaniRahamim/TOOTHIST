import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTreamentPage } from './add-treament';

@NgModule({
  declarations: [
    AddTreamentPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTreamentPage),
  ],
  exports: [
    AddTreamentPage
  ]
})
export class AddTreamentPageModule {}
