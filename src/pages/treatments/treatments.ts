import { Component } from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

/**
 * Generated class for the Treatments page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-treatments',
  templateUrl: 'treatments.html',
})
export class Treatments {
  private patient : Object;

  constructor() {
    this.patient = {first_name: 'Donald' ,
      last_name: 'Trump',
      birth_date: new Date(),
      father_name: 'Avi Trump'
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Treatments');

  }

}
