import {Init} from "./init-users";
import {Injectable} from "@angular/core";
import {Treatment} from "../pages/treatment/treatment";
import {Observable} from "rxjs/Observable";
@Injectable()

export class TreatmentService extends Init{

  treatmens: Treatment[] = [];
  currentTreatment: Treatment;

  constructor() {
    super();
    console.log('i Am here');
    this.loadTreatments();
    this.getTreatments();
  }

  getAllTreaemnts(clientId, DoctorId){
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
      localStorage.setItem('treatments', JSON.stringify(this.treatmens));
      console.log('This is the treatments : ' + this.treatmens);
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

}
