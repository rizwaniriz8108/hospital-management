import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PatientHealthDataService {

  constructor(private http:HttpClient) { }

  API_URL : string = "http://localhost:8900/patient";

  savePatientVitalDetails(request:any,patientId:any): Observable<any>{
   return  this.http.put(this.API_URL + '/patientHealth/saveVitalData/'+ patientId,request);
  }

  savePatientDiagnosticDetails(request:any,patientId:any): Observable<any>{
    return this.http.put(this.API_URL + '/patientDiagnostic/savePatientDiagnosticDetailsByPatientId/' + patientId,request);
  }
  savePatientProcedureDetails(request:any,patientId:any): Observable<any>{
    return this.http.post(this.API_URL + '/patientProcedure/saveDataByPatientId/' + patientId,request);
  }

  savePatientMedicationDetails(request:any,patientId:any): Observable<any>{
    return this.http.post(this.API_URL + '/patientMedication/saveDetailsByPatientId/' + patientId,request);
  }


}
