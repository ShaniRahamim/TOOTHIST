import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController,  Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import {Login} from "../login/login";
import {FormControl} from "@angular/forms";


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
  registerCredentials = {email: '', password: '', id: '', name: '', last_name: ''};

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) {
  }

  public register() {
    if(this.checkCredentials()) {
      this.auth.register(this.registerCredentials).subscribe(success => {
          if (success) {
            this.createSuccess = true;
            this.showPopup("הפעולה הושלמה", "המשתמש נוצר בהצלחה");
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
    if(!this.auth.checkIDValidation(this.registerCredentials.id)){
      this.showPopup("קלט לא תקין", "משתמש עם תעודת זהות זהה קיים במערכת");
      return false;
    }
    if(!this.auth.checkEmailValidation(this.registerCredentials.email)){
      this.showPopup("קלט לא תקין", "משתמש עם מייל זהה כבר קיים במערכת");
      return false;
    }
    if (this.registerCredentials.id.length != 9){
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
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}
