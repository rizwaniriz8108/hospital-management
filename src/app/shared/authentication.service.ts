import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http : HttpClient) { }
  API_URL : string = "http://localhost:8900";

  //TO IDENTIFY THE ROLE OF THE USER AND BASED ON THAT DISPLAY DASHBOARD MENU
  userRole : BehaviorSubject<string> = new BehaviorSubject(null);

  authenticateUser(request : any){
    return this.http.post<any>(this.API_URL + "/authenticate", request);  
  }

  logout(){
    let requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token")})
    };
    return this.http.delete<any>(this.API_URL + "/authenticate/logout", requestOptions);
  }

  changePassword(request: any){
    let requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token")})
    };
    return this.http.post<any>(this.API_URL + "/authenticate/changePassword", request, requestOptions);
  }

  forgotPassword(username : string){
    return this.http.get<any>(this.API_URL + "/authenticate/forgotPassword/" + username);
  }

  getUserFirstName() : string{
    return JSON.parse(atob(localStorage.getItem("token").split(".")[1])).firstname;
  }
}
