import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientExtraDataService {

  constructor(private http:HttpClient) { }

  API_URL: string = "http://localhost:8900";

  savePatientExtraDetails(request : any){
    console.log(request);
    let emailId : number = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).emailId;
    return this.http.put<any>(this.API_URL + "/patient/saveDetailedData/"+emailId ,request);
  }
}
