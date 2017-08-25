import {Component} from '@angular/core';
import {
    IonicPage, NavController, AlertController, LoadingController,
    Loading, NavParams, Platform
} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';

declare const SpeechRecognition: any;

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class Login {

    loading: Loading;
    registerCredentials = {email: '', password: '', id: '', name: '', last_name: ''};
    recognition: any;
    shit: any;

    constructor(private nav: NavController, private auth: AuthService,
                private alertCtrl: AlertController, private loadingCtrl: LoadingController,
                public platform: Platform) {
        this.shit = "";

        platform.ready().then(() => {
            console.log("Platform is ready");
        });

/*       this.trtSrv.updateTreatment().subscribe(success => {
       if (success) {
        // console.log("success");
       //this.createSuccess = true;
       // this.showPopup("הפעולה הושלמה", "הטיפול נוצר בהצלחה");
       } else {
       // this.showPopup("שגיאה", "ישנה בעיה ביצירת משתמש זה");
       }
       },
       error => {
        // console.log("error");
       //this.showPopup("שגיאה", error);
       });*/

    }

    recordShani() {
        let d = SpeechRecognition;
        this.platform.ready().then(() => {
            //this.recognition = new SpeechRecognition();
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
                    this.shit += event.results[0][0].transcript;
                }
            });
            this.recognition.start();
        });
    }

    public createAccount() {
        this.nav.push('Register');
    }

    public login() {
    //e.preventDefault();
      this.showLoading();

      //this.auth.getUser()

      this.auth.login(this.registerCredentials)
        .then(() => {
          this.nav.setRoot('Home');
        })
        .catch((error) => {
          this.showError("Access Denied");
        })
    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    showError(text) {
        this.loading.dismiss();

        let alert = this.alertCtrl.create({
            title: 'איימל או סיסמא אינם נכונים. אנא נסה שוב',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

}
