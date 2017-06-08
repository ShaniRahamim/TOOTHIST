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


    }

    recordShani() {
        console.log("sfsfsdf");
        let d = SpeechRecognition;
        /*console.log(platform);*/
        this.platform.ready().then(() => {
            console.log("sfsfsdf");
            console.log(d);
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
        this.showLoading();

        this.auth.login(this.registerCredentials).subscribe(allowed => {
                if (allowed) {

                    this.nav.setRoot('Home');
                } else {
                    this.showError("Access Denied");
                }
            },
            error => {
                this.showError(error);
            });
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
