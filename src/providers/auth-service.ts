import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from "../pages/users/users";
import {Client} from "../pages/clients/clients";
import {Init} from "./init-users";


@Injectable()
export class AuthService extends Init{
  usersInThe: User[] = [];
  currentUser: User;
  currentClients: Client;

  constructor() {
    super();
    this.load();
    this.getAllTheUsers();
    console.log(this.usersInThe);
  }

  public getAllTheUsers(){
    this.usersInThe = JSON.parse(localStorage.getItem('users'));
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let acsses = false;
        // At this point make a request to your backend to make a real check!
        this.currentUser = this.getUser(credentials.email, credentials.password);
        if(this.currentUser != null){
          acsses = true;
        }
        observer.next(acsses);
        observer.complete();
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {

      this.currentUser = new User(credentials.name, credentials.password, credentials.email, credentials.last_name, credentials.id);
      this.usersInThe.push(this.currentUser);
      localStorage.setItem('users', JSON.stringify(this.usersInThe));
      this.currentUser = null;
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public checkIDValidation(userID){
    var users = this.usersInThe.filter(user=> user.id == userID);
    if(users.length > 0) {
      return false;
    }

    return true;
  }

  public checkEmailValidation(email){
    var users = this.usersInThe.filter(user=> user.email == email);
    if(users.length > 0) {
      return false;
    }

    return true;
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

  public getUser(email, password){
    return this.usersInThe.filter(user => (user.email == email && user.password == password)).pop();
  }
}
