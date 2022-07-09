import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http : HttpClient) { }
  API_URL : string = "http://localhost:8900";

  authenticateUser(request : any){
    return this.http.post<any>(this.API_URL + "/authenticate", request);  
  }
}
