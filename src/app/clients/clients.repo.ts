import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Client} from "../pages/clients/clients";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {AppSettings} from "../config/AppSettings";


/*
 Generated class for the ClientService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class ClientsRepo{

    constructor(public http: Http){
    }

    /*getClients(user): Promise<Client[]>{

    return this.http.get(AppSettings  +  'client'/!*,{myDoctorId:user._id}*!/)
            .toPromise()
            .then(response => response.json());

        /!*console.log(user);
        this.clients = JSON.parse(localStorage.getItem('clients'));
        this.clients = this.clients.filter(client => client.myDoctorId == user);
        console.log(this.clients);
        return this.clients;*!/
    }*/

 /*   public saveClient(credentials) {
            // At this point store the credentials to your backend!
            this.currentClient = new Client(credentials.name, credentials.email, credentials.last_name, credentials.id, credentials.data, credentials.myDoctorId);
            this.clients.push(this.currentClient);
            localStorage.setItem('clients', JSON.stringify(this.clients));
    }*/
}
