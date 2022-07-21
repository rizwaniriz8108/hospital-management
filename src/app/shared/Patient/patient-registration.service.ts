import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientRegistrationService {

  constructor(private http : HttpClient) { }

  API_URL: string = "http://localhost:8900";

  registerPatient(request : any){
    return this.http.post<any>(this.API_URL + "/patient/saveSignupData",request);
  }
}
