import { Component, OnInit } from '@angular/core';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { SchedularService } from '../shared/schedular/schedular.service';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-schedular',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './schedular.component.html',
  styleUrls: ['./schedular.component.css']
})
export class SchedularComponent implements OnInit {

  constructor(private scheduleService: SchedularService, private toast: NgToastService,
     private authService : AuthenticationService) { }

  ngOnInit(): void {
    this.authService.userRole.next("ROLE_Physician");
    this.getAllEvent();
  }

  data: Object[] = [];

  public eventSettings: EventSettingsModel;

  onActionBegin(args) {
    if (args.requestType === 'eventCreate') {
      this.createEvent(args);
    }
    if(args.requestType === 'eventRemove'){
      this.deleteEvent(args.deletedRecords[0].Id);
    }
  }

  createEvent(args) {
    let token = localStorage.getItem("token");
    let payload = JSON.parse(atob(token.split(".")[1]));
    let employeeId = payload.employeeId;
    let empDbId = payload.id;
    let requestBody = {
      employeeId: employeeId,
      empDbId: empDbId,
      subject: args.addedRecords[0].Subject,
      startTime: args.addedRecords[0].StartTime,
      endTime: args.addedRecords[0].EndTime,
      description: args.addedRecords[0].description
    }
    this.scheduleService.addPhysicianSchedule(requestBody).subscribe({
      next: (response) => {
        this.toast.success({ detail: "Saved Successfully", summary: "", duration: 2000 });
      },
      error: (err) => {
        this.toast.error({ detail: "Something went wrong", summary: "", duration: 2000 });
      }
    });
  }

  getAllEvent(){
    let token = localStorage.getItem("token");
    let employeeId = JSON.parse(atob(token.split(".")[1])).employeeId;
    this.scheduleService.getEventsByEmployeeId(employeeId).subscribe({
      next: (response) => {
        if(response.length === 0){
          this.toast.success({ detail: "No scheduled meeting", summary: ""});
        }
        response.map(data => {
          let event = {
            Id: data.id,
            Subject: data.subject,
            StartTime: data.startTime,
            EndTime: data.endTime,
            IsAllDay: data.isAllDay,
          }
          this.data.push(event);
        });
        this.eventSettings = {
          dataSource: this.data
        }
      },
      error: (err) => {
        this.toast.error({ detail: "Something went wrong", summary: "" , duration: 1000});
      }
    })
  }

  deleteEvent(id: number){
    this.scheduleService.deleteEventById(id).subscribe({
      next: (response) => {
        this.toast.success({ detail: "deleted successfully", duration: 1000});
      },
      error: (err) => {
        this.toast.error({ detail: "Something went wrong", duration: 1000});
      }
    });
  }

}
