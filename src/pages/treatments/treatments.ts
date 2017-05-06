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

  public text: string;
  public recording : boolean;
  public index : number;

  constructor() {
    this.patient = null;
    this.recording = false;
    this.text = "";
    this.index = 0;
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
    this.text += "sfsfdf";
    let that = this;

    for(let index = 0; index< 100; index ++){
      console.log("dsdf");
      console.log(that);

      setTimeout(function(){

        that.index ++;
        that.text += " sfsfdf ";
      },1500);

    }



  }

}
