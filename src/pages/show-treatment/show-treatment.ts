import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Treatment} from "../treatment/treatment";
import {AudioRecorder, AudioRecorderState} from "../../providers/AudioRecorder";
import {TreatmentService} from "../../providers/treatment-service";

/**
 * Generated class for the ShowTreatmentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-show-treatment',
  templateUrl: 'show-treatment.html',
})
export class ShowTreatmentPage{

  currentTreatment: Treatment = null;
  AudioRecorderState = AudioRecorderState;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams,
              public audioRecorder: AudioRecorder, public trtSrv: TreatmentService) {
    this.currentTreatment = navParams.data;
    console.log(this.currentTreatment);
  }

  public editTreatmentAnamesis(){

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowTreatmentPage');
  }

  editTreament()
  {
    console.log(this.currentTreatment.anamnesis);
    this.trtSrv.updateTreatment(this.currentTreatment.id,
      {"anamnesis": this.currentTreatment.anamnesis}).subscribe(success => {
        if (success) {
           console.log("success updating treatment");
          //this.createSuccess = true;
           this.showPopup("הפעולה הושלמה", "הטיפול עודכן");
        } else {
          // this.showPopup("שגיאה", "ישנה בעיה ביצירת משתמש זה");
        }
      },
      error => {
         console.log("error updating treatment");
        //this.showPopup("שגיאה", error);
      });

  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {

              /* this.navCtrl.push('Home');*/
              }
          }
      ]
    });
    alert.present();
  }


  startPlayback() {
    try {
      this.audioRecorder.startPlayback();
    }
    catch (e) {
      this.showAlert('Could not play recording.');
    }
  }

  stopPlayback() {
    try {
      this.audioRecorder.stopPlayback();
    }
    catch (e) {
      this.showAlert('Could not stop playing recording.');
    }
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
