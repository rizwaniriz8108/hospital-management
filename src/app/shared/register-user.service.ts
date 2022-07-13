import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HospitalUserData } from './hospitalUserData';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserService {

  constructor(private http : HttpClient) { }
  API_URL : string = "http://localhost:8900";

  // requestOptions = {                                                                                                                                                                                 
  //   headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token")})
  // };
  registerUser(request: any){
    let requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token")})
    };
    return this.http.post<any>(this.API_URL + "/admin/user/registerUser", request, requestOptions);
  }

  displayUser(roleId : number){
    let requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token")})
    };
    return this.http.get<HospitalUserData[]>(this.API_URL + "/admin/user/getAllUserByRoleId/"+roleId, requestOptions);
  }

  changeStatusOfUser(reqeuestBody){
    let requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token")})
    };
    return this.http.put(this.API_URL + "/user/update", reqeuestBody, requestOptions);
  }
}
