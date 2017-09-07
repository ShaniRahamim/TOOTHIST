import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {ClientService} from "../../providers/client-service";
import {TreatmentService} from "../../providers/treatment-service";
import {MediaPlugin} from "ionic-native";
import {AudioRecorder} from "../../providers/AudioRecorder";
import {AudioRecorderState} from "../../providers/AudioRecorder";
import {ItemDetailsPage} from "../item-details/item-details";
import {Client} from "../clients/clients";
import {File} from '@ionic-native/file';
//import {File} from 'ionic-native';
//import {File} from "cordova-plugin-file";


declare const SpeechRecognition: any;


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

    treatmenttCredentials = {clientID: 0, doctorID: 0, reasonOfTreatment: '', anamnesis: ''};
    createSuccess = false;
    media: MediaPlugin = null;
    currentClient: Client;
    clientID: any;
    //clients: Array<Client>;
    clients: any;
    recording: boolean;
    recognition: any;
    AudioRecorderState = AudioRecorderState;
    vvv: string;
    kk: string;
    home: string;
    kk_ar: any[];
    task: any;

    constructor(public navCtrl: NavController, public audioRecorder: AudioRecorder,
                private alertCtrl: AlertController, public navParams: NavParams,
                private auth: AuthService, private clie: ClientService,
                private tre: TreatmentService, public platform: Platform, private file: File) {

        this.currentClient = this.navParams.data;
        //this.$cordovaFile =  $cordovaFile;
        this.home = 'file:///storage/emulated/0/';
        this.vvv = "toothist/tooth.wav";
        if (!this.navParams.data.id) {
            this.currentClient = null;
        }

        //this.clie.getClients(this.auth.getUserInfo().id).then(data => {
        this.clie.getAllClients().then(data => {
            this.clients = data;
        }).catch()

        if (this.currentClient) {
            this.treatmenttCredentials.clientID = Number(this.currentClient.id);
            this.treatmenttCredentials.doctorID = Number(this.currentClient.myDoctorId);
        }
        platform.ready().then(() => {
            console.log("Platform is ready");
        });

    }

    public addTreament() {

        this.treatmenttCredentials.clientID = Number(this.currentClient.id);
        this.treatmenttCredentials.doctorID = Number(this.currentClient.myDoctorId);
        console.log(this.treatmenttCredentials.clientID);
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
                            /* this.navCtrl.push('Home');*/
                            this.navCtrl.push(ItemDetailsPage, {
                                item: this.currentClient
                            });

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

        this.kk = JSON.stringify(this.file);
    }

    /* readFromFile(fileName, cb) {
     var pathToFile = cordova.file.dataDirectory + fileName;
     window.resolveLocalFileSystemURL(pathToFile, function (fileEntry) {
     fileEntry.file(function (file) {
     var reader = new FileReader();

     reader.onloadend = function (e) {
     cb(JSON.parse(this.result));
     };

     reader.readAsText(file);
     }, errorHandler.bind(null, fileName));
     }, errorHandler.bind(null, fileName));*/

    ionViewDidEnter() {
        this.media = new MediaPlugin(this.vvv)
    }

    startWithWrite(vvv) {
        try {
            this.media = new MediaPlugin(vvv);
        }
        catch (e) {
            this.showAlert(e);
        }
    }

    startWithWriteExist() {
        try {
            this.media.startRecord();
        }
        catch (e) {
            this.showAlert(e);
        }
    }

    stopWithWriteExist() {
        try {
            this.media.stopRecord();
        }
        catch (e) {
            this.showAlert(e);
        }
    }

    playWithWriteExist() {
        try {
            this.media.play();
        }
        catch (e) {
            this.showAlert(e);
        }
    }

    startRecording() {
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

    showObj() {
        try {
            this.showAlert(JSON.stringify(this.audioRecorder));
        }
        catch (e) {
            this.showAlert(e);
        }
    }

    showObjWriter() {
        try {
            this.showAlert(JSON.stringify(this.media));
        }
        catch (e) {
            this.showAlert(e);
        }
    }


    startTreatment() {
        //var d;
        try {
            let d = SpeechRecognition;
            this.platform.ready().then(() => {
                this.recording = true;
                if (d) {
                    this.recognition = new d();
                    this.recognition.lang = 'en-US';
                    this.recognition.onnomatch = (event => {
                        console.log('No match found.');
                    });
                    this.recognition.onerror = (event => {
                        console.log('Error happens.');
                    });
                    this.recognition.onresult = (event => {
                        console.log(event);

                        if (event.results.length > 0) {
                            console.log('Output STT: ', event.results[0][0].transcript);
                            this.treatmenttCredentials.anamnesis += event.results[0][0].transcript;
                        }
                    });
                    this.recognition.onstop = (event => {
                        this.recording = false;
                    });
                    this.recognition.start();
                }
            });
        }
        catch (exception) {
            this.recording = true;
        }
    }

    startTreatmentWithServer() {
        try {
            if (this.recording) {
                this.recording = false;
                clearInterval(this.task);
                this.stopWithWriteExist();
                this.file.readAsBinaryString(this.home, this.vvv).then(binaryStr => {
                    this.showAlert("uploading");
                    this.vvv =  this.vvv + new Date().getTime();
                    this.tre.sendRecord(binaryStr).subscribe(textFromIt => {
                        this.showAlert(textFromIt);
                        this.treatmenttCredentials.anamnesis += textFromIt.text();
                    }, err => this.showAlert('Directory not exists' + JSON.stringify(err)));
                });
            }else{
                this.recording = true;
                let self = this;
                this.startWithWrite(this.vvv);
                this.task = setInterval(function () {
                    self.stopWithWriteExist();
                    self.file.readAsBinaryString(this.home, this.vvv).then(binaryStr => {
                        this.showAlert("uploading");
                        this.vvv =  this.vvv + new Date().getTime();
                        this.tre.sendRecord(binaryStr).subscribe(textFromIt => {
                            this.showAlert(textFromIt);
                            this.treatmenttCredentials.anamnesis += textFromIt.text();
                        }, err => this.showAlert('Directory not exists' + JSON.stringify(err)));
                    });
                }, 3000);
            }
        }
        catch (exception) {
            this.recording = true;
        }
    }


    sendToServer() {
        this.file.readAsBinaryString(this.home, this.vvv).then(binaryStr => {
            this.showAlert("uploading");
            this.tre.sendRecord(binaryStr).subscribe(textFromIt => {
                this.showAlert(textFromIt);
            }, err => this.showAlert('Directory not exists' + JSON.stringify(err)));
        });
    }
}
