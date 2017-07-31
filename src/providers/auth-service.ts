import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from "../pages/users/users";
import {Client} from "../pages/clients/clients";
import {Init} from "./init-users";
import {Headers} from '@angular/http';

let apiUrl = 'http://ec2-13-58-189-168.us-east-2.compute.amazonaws.com:1337/user/';
//user: User;

@Injectable()
export class AuthService extends Init{
  usersInThe: User[] = [];
  static currentUser: User;
  currentClients: Client;
  obs: any;

  constructor(public http: Http) {
    super();
    this.load();
    this.getAllTheUsers();
    console.log(this.usersInThe);

/*    let headers1 = new Headers();
    headers1.append('Content-Type', 'application/json');

    this.http.post(apiUrl, JSON.stringify(''), {headers: headers1})
      .subscribe(res => {
        console.log(res);
      });
*/




  }

  public getAllTheUsers(){
    this.usersInThe = JSON.parse(localStorage.getItem('users'));
  }

  public login(credentials) {
    return new Promise(function(resolve,reject) {
      var acsses = false;
      if (credentials.email === null || credentials.password === null) {
        reject("Please insert credentials");
      } else {
        this.getUser(credentials.email, credentials.password).map(res => res.json()).subscribe(data => {
          if (data.length > 0) {
            let u = data[0];
            let user = new User(u.name, u.password, u.email, u.last_name, u.id);
            console.log(user);
            console.log(JSON.stringify(data));
            //console.log(JSON.stringify(user));
            if (user.password == credentials.password) {
              AuthService.currentUser = user;

            }
          }

          console.log(AuthService.currentUser);
          if (AuthService.currentUser && AuthService.currentUser.password == credentials.password) {
            localStorage.setItem("currentUser", JSON.stringify(AuthService.currentUser));
            resolve(AuthService.currentUser);
          }
          else {
            // AuthService.currentUser = null;
            reject("wrong password");
          }
        });
      }
    }.bind(this));
  }


  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {

      AuthService.currentUser = new User(credentials.name, credentials.password, credentials.email, credentials.last_name, credentials.id);
      this.usersInThe.push(AuthService.currentUser);
      //localStorage.setItem('users', JSON.stringify(this.usersInThe));

      //var loginServiceUrl = 'http://url.com.br'; //It is not the real one
      var res = this.http.post(apiUrl + 'create/',
        {name: AuthService.currentUser.name, last_name: AuthService.currentUser.last_name, email:AuthService.currentUser.email,
          password: AuthService.currentUser.password, id: AuthService.currentUser.id});
      AuthService.currentUser = null;
      // At this point store the credentials to your backend!
      //return Observable.create(observer => {
       // observer.next(true);
        //observer.complete();
      //});
      return res;
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
    if(!AuthService.currentUser){
      AuthService.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }
    console.log(AuthService.currentUser);
    return AuthService.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      AuthService.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  public getUser2(email):Promise<User>{
    //return this.usersInThe.filter(user => (user.email == email && user.password == password)).pop();
  //AuthService.currentUser = null;
     return new Promise(function(resolve,reject) {
    this.getUserHeader(email).subscribe(data => {
      console.log(data.length);
    if (data.length > 0) {
      let u = data[0];
      let user = new User(u.name, u.password, u.email, u.last_name, u.id);
      console.log(user);
      console.log(JSON.stringify(data));
      resolve(user);
      AuthService.currentUser = user;
      //console.log(JSON.stringify(user));
      /*if (user.password == password)
       {
       AuthService.currentUser =  user;
       }*/
    }
    else {
      reject();
    }
  });
  })
}

public getUserHeader(email)
{
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this.http.get(apiUrl + '?email=' + email, {headers: headers})
    //.map(res => res.json())
  //console.log("Headres:");
  //console.log(headers);
}

  public getUser(email, password){
    //return this.usersInThe.filter(user => (user.email == email && user.password == password)).pop();
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    AuthService.currentUser = null;
    return this.http.get(apiUrl + '?email=' + email, {headers: headers})
  }

  public getContent = function(url) {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // select http or https module, depending on reqested url
    const lib = url.startsWith('https');
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      // temporary data holder
      const body = [];
      // on every content chunk, push it to the data array
      response.on('data', (chunk) => body.push(chunk));
      // we are done, resolve promise with those joined chunks
      response.on('end', () => resolve(body.join('')));
    });
    // handle connection errors of the request
    request.on('error', (err) => reject(err))
  })
};

}
