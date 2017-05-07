import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {User} from "../users/users";
import {Client} from "../clients/clients";



/**
 * Generated class for the Home page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {

  CLIENTS: Client[] = [
    { id: 11, name: 'עידן', last_name: 'יניב', email: "Mr. Nice@walla.com", dateOfBirth: '03/11/1994'},
    { id: 12, name: 'עמית' ,last_name: 'הררי', email: "Narco@walla.com",dateOfBirth: '03/11/1994'},
    { id: 13, name: 'שני' ,last_name: 'רחמים', email: "Bombasto@walla.com",dateOfBirth: '03/11/1994'},
    { id: 14, name: 'בר' ,last_name: 'רפאלי', email: "Celeritas@walla.com",dateOfBirth: '03/11/1994'},
    { id: 15, name: 'קוקו' ,last_name: 'לוקה', email: "Magneta@walla.com",dateOfBirth: '03/11/1994'}
  ];

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

  public editClient(client: Client){
    this.nav.push('EditClient', client);
  }
}
