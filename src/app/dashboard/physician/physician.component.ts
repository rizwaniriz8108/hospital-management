import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { SchedularService } from 'src/app/shared/schedular/schedular.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

export interface TableData{
  id : number;
  date : string;
  time : string;
  doctorId : string;
  patientId : string;
  status : string;
}

@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.css']
})
export class PhysicianComponent implements OnInit {

  greetMessage : string = '';
  constructor(private authService: AuthenticationService, private schedularService : SchedularService, 
    private _liveAnnouncer: LiveAnnouncer, private toast: NgToastService,
     private route : Router) { }

    displayedColumns: string[] = ['date', 'time', 'doctor', 'patient', 'approve', 'reject'];
    dataSource = new  MatTableDataSource<TableData>();
  
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    let firstname = this.authService.getUserFirstName();
    this.authService.userRole.next("ROLE_Physician");
    let currentDate = new Date();
    let hours = currentDate.getHours();
    if(hours < 12){
      this.greetMessage = "Good Morning, "+firstname;
    }else if(hours >= 12 && hours <= 17){
      this.greetMessage = "Good Afternoon, "+firstname;
    }else if(hours > 17 && hours <= 24){
      this.greetMessage = "Good Evening, "+firstname;
    }

    let employeeId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).employeeId;
    this.schedularService.getAppointmentByStatusAndUserId('PENDING', employeeId).subscribe({
      next: (response) => {
        let tableData : TableData[] = [];
        response.map(data => {
         let splitDate = data.startTime.split("T"); 
         let date = splitDate[0];
         
         // let time = splitDate[1].substring(0,5);

         let tempTime = splitDate[1].substring(0,5);
         let splitTempTime = tempTime.split(":")
         let timeInNumber : number = +splitTempTime[0];
         let time;
         if(timeInNumber > 12){
           timeInNumber = timeInNumber - 12;
           time = timeInNumber + ":" + splitTempTime[1] + " PM";
         }else{
           time = timeInNumber + ":" + splitTempTime[1] + " AM";
         }
       
         let status = data.status;
         let doctorId = data.doctorId;
         let patientId = data.patientId;
         let tblData : TableData = {
             id: data.id,
             date : date,
             time : time,
             doctorId : doctorId,
             patientId : patientId,
             status : status
         }
          tableData.push(tblData);
       })
       this.dataSource.data = tableData as TableData[];
      }
    })

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // if (this.dataSource.paginator) {
    //   this.dataSource.paginator.firstPage();
    // }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  performOperation(value, action : string){
    let requestBody = {
      id: value,
      status : action
    }
    this.schedularService.changeAppointmentStatus(requestBody).subscribe({
      next: (response) => {
        this.toast.success({detail: "Done", duration: 1000});
      },
      error: (err) => {
        this.toast.error({detail: "Something went wrong", duration: 1000});
      }
    }) 
  }

}
