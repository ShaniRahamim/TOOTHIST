import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Client} from "../pages/clients/clients";
import {Observable} from "rxjs/Observable";
import {User} from "../pages/users/users";
import {Init} from "./init-users";

/*
  Generated class for the ClientService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ClientService extends Init{

  currentUser: User;
  currentClient: Client;
  clients :Client[] = [];

  constructor(){
    super();
    this.loadClient();
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
      this.currentClient = new Client(credentials.name, credentials.email, credentials.last_name, credentials.id, credentials.data, credentials.myDoctorId);
      this.clients.push(this.currentClient);
      localStorage.setItem('clients', JSON.stringify(this.clients));

      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
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
}
