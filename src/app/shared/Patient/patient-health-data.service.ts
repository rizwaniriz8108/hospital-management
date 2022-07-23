import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  isVitalDetailsAvailable(patientEmailId : string){
    return this.http.get<any>(this.API_URL + "/patientHealth/getVitalDataByEmailId/"+patientEmailId);
  }

  downloadReport(patientEmailId){
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get(this.API_URL + "/patientReportExport/getPatientReportInPDF/"+patientEmailId, 
    httpOptions);
  }
}
