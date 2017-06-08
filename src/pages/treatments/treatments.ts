import {Component, OnInit} from '@angular/core';
//import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import {Treatment} from "../treatment/treatment";
import {TreatmentService} from "../../providers/treatment-service";

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

  public recording : boolean;

  constructor() {
    this.patient = null;
    this.recording = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Treatments');

  }

  searchPatient(){
    this.patient = {
      first_name: 'Donald' ,
      last_name: 'Trump',
      birth_date: new Date(),
      father_name: 'Avi Trump'
    };
  }

  startTreatment(){
    this.recording = true;
  }

}
