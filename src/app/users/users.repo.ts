import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Client} from "../pages/clients/clients";
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {AppSettings} from "../config/AppSettings";
import {User} from "../../pages/users/users";


/*
 Generated class for the ClientService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UsersRepo {

    constructor(public http: Http) {
    }

    createUser(user: User): Promise<User>{

        console.log("Sfds");
        return this.http.post(AppSettings.API_ENDPOINT + 'user',{user})
            .toPromise()
            .then(response => response.json());
    }

    getUser(email, password): Promise<User[]> {

       /* let requestParams = new RequestOptions();*/
       /*let requestParams = new URLSearchParams();
        requestParams.email =  email;
        requestParams.password =  password;*/

        return this.http.get(AppSettings.API_ENDPOINT + 'user')//, requestParams)
            .toPromise()
            .then(response => response.json());

        /*console.log(user);
         this.clients = JSON.parse(localStorage.getItem('clients'));
         this.clients = this.clients.filter(client => client.myDoctorId == user);
         console.log(this.clients);
         return this.clients;*/
    }
}
