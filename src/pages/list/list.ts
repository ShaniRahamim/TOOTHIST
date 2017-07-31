import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import {Client} from "../clients/clients";
import {ClientService} from '../../providers/client-service';
import {AuthService} from '../../providers/auth-service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  icons: string[];
  /*items: Array<{title: string, note: string, icon: string}>;*/
  //items : Array<Client>;
  //items: Client[] = new Array;
  items: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public clientSrv: ClientService, private auth: AuthService) {
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    /*this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }*/
  //this.items = JSON.parse(localStorage.getItem("clients"));
   this.clientSrv.getClients(AuthService.currentUser.id).then(data => {
     this.items = data;
   }).catch();

  console.log('curr user is ' + AuthService.currentUser);
  console.log(AuthService.currentUser);

    /* for(let i = 1; i < 11; i++) {
       this.items.push({
         title: 'Item ' + i+"  "+this.items[i].name,
         note: 'This is item #' + i,
         icon: this.icons[Math.floor(Math.random() * this.icons.length)]
       });
     }*/

  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  public createClient() {
    this.navCtrl.push('AddClient');
  }
}
