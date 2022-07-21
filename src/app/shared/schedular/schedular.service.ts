import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppointmentData } from '../AppointmentData';

@Injectable({
  providedIn: 'root'
})
export class SchedularService {

  constructor(private http: HttpClient) { }
  API_URL: string = "http://localhost:8900";

  addPhysicianSchedule(request: any) {
    let requestOptions = {
      headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") })
    };
    return this.http.post(this.API_URL + "/schedule", request, requestOptions);
  }

  getEventsByEmployeeId(employeeId: string) {
    let requestOptions = {
      headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") })
    };
    return this.http.get<any[]>(this.API_URL + "/schedule/getAllEventsByEmployeeId/" + employeeId, requestOptions);
  }

  deleteEventById(id: number) {
    let requestOptions = {
      headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") })
    };
    return this.http.delete(this.API_URL + "/schedule/deleteById/" + id, requestOptions);
  }

  getAvailableAppointmentsByEmployeeId(employeeId: string) {
    let requestOptions = {
      headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") })
    };
    return this.http.get<any[]>(this.API_URL + "/schedule/getAllAvailableAppointment/" + employeeId, 
                        requestOptions);
  }

  sendBookingRequest(requestBody: any){
    let requestOptions = {
      headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") })
    };
    return this.http.post<any>(this.API_URL + "/schedule/sendBookingRequest", requestBody,requestOptions);
  }

  getAppointmentByStatusAndUserId(status : string, userId: string){
    let requestOptions = {
      headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") })
    };
    return this.http.get<AppointmentData[]>(this.API_URL + "/schedule/getAppointment/"+status+"/"+userId, requestOptions);
  }

  changeAppointmentStatus(requestBody : any){
    let requestOptions = {
      headers: new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem("token") })
    };
    return this.http.put(this.API_URL + "/schedule/changeStatus", requestBody, requestOptions);
  }
}
