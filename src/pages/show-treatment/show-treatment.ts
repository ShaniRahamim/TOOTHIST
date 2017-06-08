import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Treatment} from "../treatment/treatment";
import {AudioRecorder, AudioRecorderState} from "../../providers/AudioRecorder";

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

  curretnTreatment: Treatment = null;
  AudioRecorderState = AudioRecorderState;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public audioRecorder: AudioRecorder) {
    this.curretnTreatment = navParams.data;
  }

  public editTreatmentAnamesis(){

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowTreatmentPage');
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
