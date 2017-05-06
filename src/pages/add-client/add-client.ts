import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ClientService} from "../../providers/client-service";
import {AuthService} from "../../providers/auth-service";

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
  clientCredentials = { email: '', name: '', id: '', last_name: '', dateOfBirth: '' };

  constructor(public navCtrl: NavController, private clie: ClientService,  private alertCtrl: AlertController) {
  }

  public addNewClient() {
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

}
