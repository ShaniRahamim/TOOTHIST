import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from "../pages/users/users";
import {Client} from "../pages/clients/clients";
import {Init} from "./init-users";
import {UsersRepo} from "../app/users/users.repo";


@Injectable()
export class AuthService extends Init{
  usersInThe: User[] = [];
  currentUser: User;
  currentClients: Client;
  userObserver:any;

  constructor( private usersRepo: UsersRepo) {
   /* Observable.create(observer => {
      this.userObserver = observer;
    });*/
    super();
    this.load();
    this.getAllTheUsers();
  }

  public getAllTheUsers(){
    this.usersInThe = JSON.parse(localStorage.getItem('users'));
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        debugger;
        let acsses = false;
        // At this point make a request to your backend to make a real check!
        this.getUser(credentials.email, credentials.password)
            .then((users)=>{
              this.currentUser = users[0];
              if(this.currentUser != null){
                acsses = true;
              }
              observer.next(acsses);
              observer.complete();

            });
      });
    }
  }

  public register(credentials) {
    return Observable.create(observer => {
      if (credentials.email === null || credentials.password === null) {
        return Observable.throw("Please insert credentials");
      } else {
        this.currentUser = new User(credentials.name, credentials.password, credentials.email,
            credentials.last_name, credentials.id);
        this.usersRepo.createUser(this.currentUser).then((user)=>{
          debugger;
          this.currentUser = user;
          observer.next(true);
          observer.complete();
          //this.currentUser = null;
        });
        /*return Observable.create(observer => {
         observer.next(true);
         observer.complete();
         });*/

      }

    });
  }

   public getUserInfo() : User {
    console.log(this.currentUser.name);
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  public getUser(email, password):Promise<User[]>{
    return this.usersRepo.getUser(email,password);
    //return this.usersInThe.filter(user => (user.email == email && user.password == password)).pop();
    //return new User();
  }
}
