import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Client} from "../pages/clients/clients";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the ClientService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ClientService {

  currentClient: Client;

  public addNewClient(credentials) {
    if (credentials.id === null || credentials.name === null || credentials.last_name == null ||
        credentials.dateOfBirth == null || credentials.email == null ) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public updateClient(client:Client){
    return Observable.create(observer => {
      observer.next(true);
      observer.complete();
    });
  }

}
