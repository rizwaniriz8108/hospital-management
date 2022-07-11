import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }
  API_URL : string = "http://localhost:8900";

  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token")})
  };
  getAllUsersCount(){
    return this.http.get<any>(this.API_URL + "/user/getAllUserCount", this.requestOptions);
  }
}
