import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ClientService} from "../../providers/client-service";
import {AuthService} from "../../providers/auth-service";
import {ItemDetailsPage} from "../item-details/item-details";

/**
 * Generated class for the AddClient page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-client',
  templateUrl: 'add-client.html',
})
export class AddClient {

  createSuccess = false;
  doctorId: number;
  clientCredentials = { email: '', name: '', id: '', last_name: '', dateOfBirth: '', myDoctorId: 0};

  constructor(public navCtrl: NavController, private auth: AuthService, private clie: ClientService,  private alertCtrl: AlertController) {
    let info = this.auth.getUserInfo();
    this.doctorId = info['id'];
  }

  public addNewClient() {
    if(this.checkCredentials()) {
      this.clientCredentials.myDoctorId = this.doctorId;
      this.clie.addNewClient(this.clientCredentials).subscribe(success => {
          if (success) {
            this.createSuccess = true;
            this.showPopup("הפעולה הושלמה", "הלקוח נשמר בהצלחה");
          } else {
            this.showPopup("שגיאה", "ישנה בעיה ביצירת משתמש זה");
          }
        },
        error => {
          this.showPopup("שגיאה", error);
        });
    }
  }

  private checkCredentials() {
    if(this.clie.checkIDValidation(this.clientCredentials.id)){
      this.showPopup("קלט לא תקין", "משתמש עם תעודת זהות זהה קיים במערכת");
      return false;
    }
    if(!this.clie.checkEmailValidation(this.clientCredentials.email)){
      this.showPopup("קלט לא תקין", "משתמש עם מייל זהה כבר קיים במערכת");
      return false;
    }
    if (this.clientCredentials.id.length != 9){
      this.showPopup("קלט לא תקין", "תעודת זהות חייבת להיות 9 ספרות");
      return false;
    }

    return true;
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
              /*this.navCtrl.push(ItemDetailsPage, {
                item: this.clientCredentials
              });*/

            }
          }
        }
      ]
    });
    alert.present();
  }

}
