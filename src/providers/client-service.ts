import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Client} from "../pages/clients/clients";
import {Observable} from "rxjs/Observable";
import {User} from "../pages/users/users";
import {Init} from "./init-users";
import { Http } from '@angular/http';
import {Headers} from '@angular/http';
import {AuthService} from './auth-service';

/*
  Generated class for the ClientService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

let apiUrl = 'http://ec2-13-58-189-168.us-east-2.compute.amazonaws.com:1337/client/';

@Injectable()
export class ClientService extends Init{

  currentUser: User;
  currentClient: Client;
  clients :Client[] = [];
  myClients: Client[] = new Array;

  constructor(public http: Http, private auth: AuthService){
    super();
    this.loadClient();
  }

  getClientHttp(doctorId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(apiUrl + '?myDoctorId=' + doctorId, {headers: headers})
  }

  getAllClientsHttp() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(apiUrl, {headers: headers})
  }

  getClients(doctorId)
  {
    return new Promise(function(resolve,reject) {
        this.getClientHttp(doctorId).map(res => res.json()).subscribe(data => {
          this.myClients = new Array();
          if (data.length > 0) {
            for (let c of data) {
              let client = new Client(c.name,c.email,c.last_name,c.id,c.dataOfBirth,c.myDoctorId);
              //let u = data[0];
              //let user = new User(u.name, u.password, u.email, u.last_name, u.id);
              console.log(client);
              this.myClients.push(client);
            }
            console.log(JSON.stringify(data));
            //console.log(JSON.stringify(user));
          }
          resolve(this.myClients);
            // AuthService.currentUser = null;
            reject("no clients");
          })
    }.bind(this));
  }

  getAllClients()
  {
    return new Promise(function(resolve,reject) {
      this.getAllClientsHttp().map(res => res.json()).subscribe(data => {
        this.myClients = new Array();
        if (data.length > 0) {
          for (let c of data) {
            let client = new Client(c.name,c.email,c.last_name,c.id,c.dataOfBirth,c.myDoctorId);
            //let u = data[0];
            //let user = new User(u.name, u.password, u.email, u.last_name, u.id);
            console.log(client);
            this.myClients.push(client);
          }
          console.log(JSON.stringify(data));
          //console.log(JSON.stringify(user));
        }
        resolve(this.myClients);
        // AuthService.currentUser = null;
        reject("no clients");
      })
    }.bind(this));
  }

  getMyClients(user){
      console.log(user);
      this.clients = JSON.parse(localStorage.getItem('clients'));
      this.clients = this.clients.filter(client => client.myDoctorId == user);
      console.log(this.clients);
      return this.clients;
  }

    public addNewClient(credentials) {
      if (credentials.id === null || credentials.name === null || credentials.last_name == null ||
        credentials.dateOfBirth == null || credentials.email == null ) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      this.currentClient = new Client(credentials.name, credentials.email, credentials.last_name, credentials.id, credentials.dateOfBirth, credentials.myDoctorId);
      this.clients.push(this.currentClient);
      //localStorage.setItem('clients', JSON.stringify(this.clients));
      var res = this.http.post(apiUrl + 'create/',
      {name: this.currentClient.name, last_name: this.currentClient.last_name, email:this.currentClient.email,
          id: this.currentClient.id, dataOfBirth: this.currentClient.dateOfBirth, myDoctorId:AuthService.currentUser.id });
      /*return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });*/
      return res;
    }
  }


  public checkIDValidation(clientID){
    var clients = this.clients.filter(client=> client.id == clientID);
    if(clients.length > 0) {
      return true;
    }

    return false;
  }

  public checkEmailValidation(email){
    var clients = this.clients.filter(client=> client.email == email);
    if(clients.length > 0) {
      return false;
    }

    return true;
  }

  public updateClient(client:Client){
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }

  public getUserInfo() : Client {
    console.log(this.currentClient);
    return this.currentClient;
  }

  public deleteClient(item: Client){
    console.log(item.id);

    var res = this.http.post(apiUrl + 'destroy/',{id:item.id});
    return res;
  }
}
