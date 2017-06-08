import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Treatment} from "../treatment/treatment";
import {AuthService} from "../../providers/auth-service";
import {TreatmentService} from "../../providers/treatment-service";

/**
 * Generated class for the ClientTreatmentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-client-treatments',
  templateUrl: 'client-treatments.html',
})
export class ClientTreatmentsPage implements OnInit{

  TREATMENTS: Treatment[] = [];
  doctorID: number;
  clientID: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private aut: AuthService, private tri: TreatmentService) {
    var client = this.navParams.data;
    this.clientID = client.id;
    this.doctorID = client.myDoctorId;
  }

  ngOnInit(){
    this.TREATMENTS = this.tri.getAllTreaemnts(this.clientID, this.doctorID);
  }

  showTreatment(treatment: Treatment){
    this.navCtrl.push('ShowTreatmentPage', treatment);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientTreatmentsPage');
  }

}
