import {Component, OnInit, NgModule} from '@angular/core';
import {NavController, IonicPage, IonicPageModule} from 'ionic-angular';
import {AuthService} from '../../providers/auth-service';
import {User} from "../users/users";
import {Client} from "../clients/clients";
import {ClientService} from "../../providers/client-service";

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
export class Home implements OnInit{

  CLIENTS: Client[] = [
  ];

  username = '';
  email = '';
  userId: number;
  constructor(private nav: NavController, private auth: AuthService, private cli: ClientService) {
    let info = this.auth.getUserInfo();
    this.username = info['name'];
    this.email = info['email'];
    this.userId = info['id'];
  }

  ngOnInit(){
    console.log(this.userId);
    this.CLIENTS = this.cli.getMyClients(this.userId);
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


  public addTreatment(){
    this.nav.push('AddTreamentPage');//, this.selectedClient);
  }
}
