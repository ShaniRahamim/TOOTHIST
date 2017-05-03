import { Component } from '@angular/core';
/*import { IonicPage, NavController, NavParams } from 'ionic-angular';*/
import {IonicPage} from 'ionic-angular';

/**
 * Generated class for the Users page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
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
