import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Client} from "../clients/clients";
import {ClientService} from "../../providers/client-service";

/**
 * Generated class for the EditClient page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-edit-client',
  templateUrl: 'edit-client.html',
})
export class EditClient {

  selectedClient: Client;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cli: ClientService) {
    this.selectedClient= this.navParams.data;
  }

  public editClient(client){
    this.cli.updateClient(client);
    this.selectedClient = client;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditClient');
  }

}
