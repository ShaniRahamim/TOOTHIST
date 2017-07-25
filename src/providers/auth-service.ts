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
  currentUser: User;
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
        this.setUser(credentials.email, credentials.password).map(res => res.json()).subscribe(data => {
          if (data.length > 0) {
            let u = data[0];
            let user = new User(u.name, u.password, u.email, u.last_name, u.id);
            console.log(user);
            console.log(JSON.stringify(data));
            //console.log(JSON.stringify(user));
            if (user.password == credentials.password) {
              this.currentUser = user;
            }
          }

          console.log(this.currentUser);
          if (this.currentUser && this.currentUser.password == credentials.password) {
            localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
            resolve(this.currentUser);
          }
          else {
            // this.currentUser = null;
            reject("wrong password");
          }
        });


        //}).catch(function () {
        //  this.currentUser = null;
        //  return false;
        // })
      }
    }.bind(this));
      /*this.currentUser = null;
      let headers = new Headers();
      headers.append('Content-Type','application/json');
      return this.http.get(apiUrl + '?email=' + credentials.email, {headers: headers})
        .map(res => res.json()).subscribe(data => {*/
        /*    let b;
         let a = new Promise((resolve, reject) => {
         */



        //console.log(b);
        //console.log(a);

        /*if (data.length > 0) {
          let u = data[0];
          let user = new User(u.name, u.password, u.email, u.last_name, u.id);
          console.log(user);
          console.log(JSON.stringify(data));
          //console.log(JSON.stringify(user));
          if (user.password == credentials.password) {
            this.currentUser = user;
          }
        }*/

        //this.obs = Observable.create(observer => {

          // At this point make a request to your backend to make a real check!

          //this.currentUser = this.getUser(credentials.email, credentials.password);
     //     console.log(this.currentUser);
      //    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
       //   if (this.currentUser != null) {
            //acsses = true;
      //      return true;
       //   }
          //observer.next(acsses);
          //observer.complete();
       //   return false;
       // }

    }     //return Observable.throw("Please insert credentials2");


  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {

      this.currentUser = new User(credentials.name, credentials.password, credentials.email, credentials.last_name, credentials.id);
      this.usersInThe.push(this.currentUser);
      //localStorage.setItem('users', JSON.stringify(this.usersInThe));

      //var loginServiceUrl = 'http://url.com.br'; //It is not the real one
      var res = this.http.post(apiUrl + 'create/',
        {name: this.currentUser.name, last_name: this.currentUser.last_name, email:this.currentUser.email,
          password: this.currentUser.password, id: this.currentUser.id});
      this.currentUser = null;
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
    if(!this.currentUser){
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }
    console.log(this.currentUser);
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  public getUser(email):Promise<User>{
    //return this.usersInThe.filter(user => (user.email == email && user.password == password)).pop();
  //this.currentUser = null;
     return new Promise(function(resolve,reject) {
    this.getUserHeader(email).subscribe(data => {
      console.log(data.length);
    if (data.length > 0) {
      let u = data[0];
      let user = new User(u.name, u.password, u.email, u.last_name, u.id);
      console.log(user);
      console.log(JSON.stringify(data));
      resolve(user);
      this.currentUser = user;
      //console.log(JSON.stringify(user));
      /*if (user.password == password)
       {
       this.currentUser =  user;
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

  public setUser(email, password){
    //return this.usersInThe.filter(user => (user.email == email && user.password == password)).pop();
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    this.currentUser = null;
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
