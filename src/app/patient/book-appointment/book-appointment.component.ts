import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { NgToastService } from 'ng-angular-popup';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SchedularService } from 'src/app/shared/schedular/schedular.service';
import { AppointmentData } from 'src/app/shared/AppointmentData';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface TableData{
  date : string;
  time : string;
  doctorId : string;
  patientId : string;
  status : string;
}

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})


export class BookAppointmentComponent implements OnInit {

  constructor(private authService: AuthenticationService,
    private toast: NgToastService, public dialog: MatDialog, private schedularService : SchedularService, 
    private _liveAnnouncer: LiveAnnouncer) {
  }

  displayedColumns: string[] = ['date', 'time', 'doctor', 'patient', 'status'];
  pendingDataSource = new  MatTableDataSource<TableData>();
  approvedDataSource = new  MatTableDataSource<TableData>();
  rejectDataSource = new  MatTableDataSource<TableData>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.authService.userRole.next("ROLE_Patient");
    let employeeId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).employeeId;
    this.schedularService.getAppointmentByStatusAndUserId('ALL', employeeId).subscribe({
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
              date : date,
              time : time,
              doctorId : doctorId,
              patientId : patientId,
              status : status
          }
           tableData.push(tblData);
        })

        this.pendingDataSource.data = tableData.filter(data => data.status === 'PENDING') as TableData[];
        this.approvedDataSource.data = tableData.filter(data => data.status === 'APPROVED') as TableData[];
        this.rejectDataSource.data = tableData.filter(data => data.status === 'REJECTED') as TableData[];
      }
    });
  }

  
  ngAfterViewInit() {
    this.pendingDataSource.sort = this.sort;
    this.pendingDataSource.paginator = this.paginator;
    
    // this.approvedDataSource.sort = this.sort;
    // this.approvedDataSource.paginator = this.paginator;

    // this.rejectDataSource.sort = this.sort;
    // this.rejectDataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.pendingDataSource.filter = filterValue.trim().toLowerCase();
    this.approvedDataSource.filter = filterValue.trim().toLowerCase();
    this.rejectDataSource.filter = filterValue.trim().toLowerCase();
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

  openAppoinmentDialog(): void {
    this.dialog.open(AppointmentDialogComponent, {
      width: '450px',
      height: '360px'
    });
  }
}



