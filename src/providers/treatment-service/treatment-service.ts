import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Treatment} from "../../pages/treatment/treatment";
import {Observable} from "rxjs/Observable";
import {Init} from "../init-users";

/*
  Generated class for the TreatmentServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TreatmentServiceProvider extends Init{

  treatmens: Treatment[] = [];
  currentTreatment: Treatment;

  constructor() {
    super();
    this.loadTreatments();
    this.getAllTreaemnts();
  }

  getAllTreaemnts(){
    this.treatmens = JSON.parse(localStorage.getItem('treatments'));
  }

  public addTreatment(credentials){
    if (credentials.reasonOfTreatment === null) {
      return Observable.throw("Please insert credentials");
    } else {

      this.currentTreatment = new Treatment(credentials.doctorID, credentials.clientId, credentials.reasonOfTreatment);
      this.treatmens.push(this.currentTreatment);
      localStorage.setItem('treatments', JSON.stringify(this.treatmens));
      this.currentTreatment = null;
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

}
