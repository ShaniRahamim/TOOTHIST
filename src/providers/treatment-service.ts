import {Init} from "./init-users";
import {Injectable} from "@angular/core";
import {Treatment} from "../pages/treatment/treatment";
import {Observable} from "rxjs/Observable";
import { Http } from '@angular/http';
import {Headers} from '@angular/http';

let apiUrl = 'http://ec2-13-58-189-168.us-east-2.compute.amazonaws.com:1337/treatment/';

@Injectable()

export class TreatmentService extends Init{

  treatmens: Treatment[] = [];
  currentTreatment: Treatment;
  myTreatments: Treatment[] = new Array;

  constructor(public http: Http) {
    super();
    console.log('i Am here');
    this.loadTreatments();
    this.getTreatments();
  }

  getTreatmentHttp(clientId, doctorId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(apiUrl + '?clientId=' + clientId + '&doctorId=' + doctorId, {headers: headers})
  }

  getAllTreaemnts(clientId, doctorId){
    return new Promise(function(resolve,reject) {
      console.log('start getting treatments');
      this.getTreatmentHttp(clientId, doctorId).map(res => res.json()).subscribe(data => {
        this.myTreatments = new Array();
        console.log('in the loop');
        console.log(data);
        if (data.length > 0) {
          for (let t of data) {
            console.log('create treatment');
            console.log(t);
            let treatment = new Treatment(t.clientID, t.DoctorID, t.reasonOfTreatment);
            treatment.anamnesis = t.anamnesis;
            //let u = data[0];
            //let user = new User(u.name, u.password, u.email, u.last_name, u.id);
            console.log(treatment);
            this.myTreatments.push(treatment);
          }
          console.log(JSON.stringify(data));
          //console.log(JSON.stringify(user));
        }
        resolve(this.myTreatments);
        // AuthService.currentUser = null;
        reject("no treatments");
      })
    }.bind(this));

    /*this.treatmens = JSON.parse(localStorage.getItem('treatments'));
    console.log(clientId);
    console.log(DoctorId);
    console.log(this.treatmens);
    var someTreatments = this.treatmens.filter(treatment=> (treatment.clientId == clientId && treatment.doctorId == DoctorId));
    return someTreatments;*/
  }

  getAllTreaemnts2(clientId, DoctorId){
    this.treatmens = JSON.parse(localStorage.getItem('treatments'));
    console.log(clientId);
    console.log(DoctorId);
    console.log(this.treatmens);
    var someTreatments = this.treatmens.filter(treatment=> (treatment.clientId == clientId && treatment.doctorId == DoctorId));
    return someTreatments;
  }

  getTreatments(){
    this.treatmens = JSON.parse(localStorage.getItem('treatments'));
  }

  public addTreatment(credentials){
    if (credentials.reasonOfTreatment === null) {
      return Observable.throw("Please insert credentials");
    } else {

      this.currentTreatment = new Treatment(credentials.clientID,credentials.doctorID, credentials.reasonOfTreatment);
      if(credentials.anamnesis.length > 0){
        this.currentTreatment.anamnesis = credentials.anamnesis;
      }
      this.treatmens.push(this.currentTreatment);
      //localStorage.setItem('treatments', JSON.stringify(this.treatmens));

      var res = this.http.post(apiUrl + 'create/',
        //{clientId: this.currentTreatment.clientId, doctorId: this.currentTreatment.doctorId,
        //anamnesis: this.currentTreatment.anamnesis, reasonOfTreatment: this.currentTreatment.reasonOfTreatment}
        this.currentTreatment
      )

      console.log('This is the treatments : ' + this.treatmens);
      console.log(this.currentTreatment);
      // At this point store the credentials to your backend!
/*      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });*/
      return res;
    }
  }

  public editTreatmentAnamesis(treatment){
    var treatmentToEdit = this.treatmens.filter(currTreatment => (currTreatment.clientId == treatment.clientId && currTreatment.doctorId == treatment.doctorId &&
                                            currTreatment.reasonOfTreatment == treatment.reasonOfTreatment)).pop();
    treatmentToEdit.anamnesis = treatment.anamnesis;
    localStorage.setItem('treatments', JSON.stringify(this.treatmens));

  }

}
