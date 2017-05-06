import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {User} from "../users/users";

const USERS: User[] = [
  { id: 11, name: 'Mr. Nice', last_name: 'Dior', email: "Mr. Nice@walla.com"},
  { id: 12, name: 'Narco' ,last_name: 'Dior', email: "Narco@walla.com"},
  { id: 13, name: 'Bombasto' ,last_name: 'Dior', email: "Bombasto@walla.com"},
  { id: 14, name: 'Celeritas' ,last_name: 'Dior', email: "Celeritas@walla.com"},
  { id: 15, name: 'Magneta' ,last_name: 'Dior', email: "Magneta@walla.com"},
  { id: 16, name: 'RubberMan' ,last_name: 'Dior', email: "RubberMan@walla.com"},
  { id: 17, name: 'Dynama' ,last_name: 'Dior', email: "Dynama@walla.com"},
  { id: 18, name: 'Dr IQ' ,last_name: 'Dior', email: "DrIQ@walla.com"},
  { id: 19, name: 'Magma' ,last_name: 'Dior', email: "Magma@walla.com"},
  { id: 20, name: 'Tornado' ,last_name: 'Dior', email: "Tornado@walla.com"}
];

/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class Home {

  username = '';
  email = '';
  constructor(private nav: NavController, private auth: AuthService) {
    let info = this.auth.getUserInfo();
    this.username = info['name'];
    this.email = info['email'];
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('Login')
    });
  }

  public createClient() {
    this.nav.push('AddClient');
  }

}
