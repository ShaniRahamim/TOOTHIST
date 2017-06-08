import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {ClientService} from "../../providers/client-service";
import {TreatmentService} from "../../providers/treatment-service";
import {MediaPlugin} from "ionic-native";
import {AudioRecorder} from "../../providers/AudioRecorder";
import {AudioRecorderState} from "../../providers/AudioRecorder";


/**
 * Generated class for the AddTreamentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-treament',
  templateUrl: 'add-treament.html',
})
export class AddTreamentPage {

  treatmenttCredentials = { clientID: 0, doctorID: 0, reasonOfTreatment: ''};
  createSuccess = false;
  media: MediaPlugin = null;
  AudioRecorderState = AudioRecorderState;

  constructor(public navCtrl: NavController, public audioRecorder: AudioRecorder,  private alertCtrl: AlertController, public navParams: NavParams, private auth: AuthService, private clie: ClientService, private tre: TreatmentService) {

    var client = this.navParams.data;
    console.log('The client id' + client.id);
    this.treatmenttCredentials.clientID = Number(client.id);
    this.treatmenttCredentials.doctorID = Number(client.myDoctorId);
    console.log(this.treatmenttCredentials.clientID);
  }

  public addTreament(){
    this.tre.addTreatment(this.treatmenttCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("הפעולה הושלמה", "הטיפול נוצר בהצלחה");
        } else {
          this.showPopup("שגיאה", "ישנה בעיה ביצירת משתמש זה");
        }
      },
      error => {
        this.showPopup("שגיאה", error);
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
            if (this.createSuccess) {
              this.navCtrl.push('Home');

            }
          }
        }
      ]
    });
    alert.present();
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTreamentPage');

  }

  ionViewDidEnter(){
    this.media = new MediaPlugin('../Library/NoCloud/recording.wav')

  }

  startRecording(){
    try {
      this.audioRecorder.startRecording();
    }
    catch (e) {
      this.showAlert('Could not start recording.');
    }
  }

  stopRecording() {
    try {
      this.audioRecorder.stopRecording();
    }
    catch (e) {
      this.showAlert('Could not stop recording.');
    }
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

  savePlayback(){

  }

}
