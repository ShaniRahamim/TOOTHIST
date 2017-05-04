import { Component } from '@angular/core';
/*import { IonicPage, NavController, NavParams } from 'ionic-angular';*/
import {IonicPage} from 'ionic-angular';

/**
 * Generated class for the Users page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
export class User {
  name: string;
  last_name: string;
  email: string;
  id: number;


  constructor(name: string, email: string, last_name: string, id: number) {
    this.name = name;
    this.email = email;
    this.last_name = last_name;
    this.id = id;
  }
}

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})

export class Users {


  /*constructor(public navCtrl: NavController, public navParams: NavParams) {
  }*/
  constructor() {
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Users');
  }

}
