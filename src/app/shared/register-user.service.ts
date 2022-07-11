import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HospitalUserData } from './hospitalUserData';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private http : HttpClient) { }
  API_URL : string = "http://localhost:8900";

  requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token")})
  };
  registerUser(request: any){
    return this.http.post<any>(this.API_URL + "/admin/user/registerUser", request, this.requestOptions);
  }

  displayUser(roleId : number){
    return this.http.get<HospitalUserData[]>(this.API_URL + "/admin/user/getAllUserByRoleId/"+roleId, this.requestOptions);
  }
}
