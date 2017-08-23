import {AlertController, Platform} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Treatment} from "../treatment/treatment";
import {AuthService} from "../../providers/auth-service";
import {TreatmentService} from "../../providers/treatment-service";
//import {ItemDetailsPage} from "../item-details/item-details";

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

  createSuccess = false;
  //TREATMENTS: Treatment[] = [];
  TREATMENTS: any;
  doctorID: number;
  clientID: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private aut: AuthService, private tri: TreatmentService,
              public platform: Platform, alertCtrl: AlertController) {
    var client = this.navParams.data;
    this.clientID = client.id;
    this.doctorID = client.myDoctorId;
  }

  ngOnInit(){
    console.log('Getting treatments');
    //this.TREATMENTS = this.tri.getAllTreaemnts(this.clientID, this.doctorID);
    this.tri.getAllTreaemnts(this.clientID, this.doctorID).then(data => {
      this.TREATMENTS = data;
      console.log(this.TREATMENTS);
    }).catch();
    console.log(this.TREATMENTS);
   /* this.tri.updateTreatment().subscribe(success => {
        if (success) {
          this.createSuccess = true;
         // this.showPopup("הפעולה הושלמה", "הטיפול נוצר בהצלחה");
        } else {
         // this.showPopup("שגיאה", "ישנה בעיה ביצירת משתמש זה");
        }
      },
      error => {
        //this.showPopup("שגיאה", error);
      });*/
    //console.log(this.TREATMENTS[0]);
  }

  showTreatment(treatment: Treatment){
    console.log(treatment);
    this.navCtrl.push('ShowTreatmentPage', treatment);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientTreatmentsPage');
  }


  /*showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {*/
              /* this.navCtrl.push('Home');*/
            /*  this.navCtrl.push(ItemDetailsPage, {
                item: this.currentClient
              });
*/
          /*  }
          }
        }
      ]
    });
    alert.present();
  }*/

/*  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }*/
}
