import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DisplayDataService {

  API_URL: string = "http://localhost:8900/patient";

  constructor(private http:HttpClient) { }

  getPatientAllData(){
    return this.http.get<any[]>(this.API_URL + "/getAllData")
  }

}
