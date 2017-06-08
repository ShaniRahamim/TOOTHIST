import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Client} from "../clients/clients";


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  //selectedItem: any;
  selectedItem: Client;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  public editClient(client: Client){
    this.navCtrl.push('EditClient', client);
  }
  public addTreatment(){
    this.navCtrl.push('AddTreamentPage', this.selectedItem);
  }

  public showTreatments(){
    this.navCtrl.push('ClientTreatmentsPage', this.selectedItem);
  }

}
