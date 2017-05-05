import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,  Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import {Login} from "../login/login";


/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {
  createSuccess = false;
  registerCredentials = { email: '', password: '', id: '', name: '', last_name: '' };

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) { }

  public register() {
    this.auth.register(this.registerCredentials).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("הפעולה הושלה", "המשתמש נוצר בהצלחה");
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
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
