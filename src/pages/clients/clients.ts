import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DateFormatter} from "@angular/common/src/pipes/intl";

/**
 * Generated class for the Clients page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
export class Client {

  name: string;
  last_name: string;
  email: string;
  id: number;
  dateOfBirth: DateFormatter;
  myDoctorId: number;


  constructor(name: string, email: string, last_name: string, id: number, dateOfBirth: Date, myDoctorId: number) {
    this.name = name;
    this.email = email;
    this.last_name = last_name;
    this.id = id;
    this.dateOfBirth= dateOfBirth;
    this.myDoctorId = myDoctorId;
  }
}

@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class Clients {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Clients');
  }

}
