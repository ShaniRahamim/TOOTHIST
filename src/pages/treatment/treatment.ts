import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


export class Treatment{

  clientId : number;
  doctorId : number;
  anamnesis: string;
  reasonOfTreatment: string;

  constructor(ClientID: number, DoctorID: number,reasonOfTreatment: string){

    this.clientId = ClientID;
    this.doctorId = DoctorID;
    this.reasonOfTreatment = reasonOfTreatment;
  }

 /* constructor(ClientID: number, DoctorID: number,anamnesis: string, reasonOfTreatment: string){

    this.clientId = ClientID;
    this.doctorId = DoctorID;
    this.anamnesis = anamnesis;
    this.reasonOfTreatment = reasonOfTreatment;
  }*/
}
/**
 * Generated class for the TreatmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-treatment',
  templateUrl: 'treatment.html',
})
export class TreatmentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TreatmentPage');
  }
}
