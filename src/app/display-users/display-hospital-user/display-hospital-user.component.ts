import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HospitalUserData } from 'src/app/shared/hospitalUserData';
import { RegisterUserService } from 'src/app/shared/register-user.service';
import { ActivatedRoute } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-display-hospital-user',
  templateUrl: './display-hospital-user.component.html',
  styleUrls: ['./display-hospital-user.component.css']
})


export class DisplayHospitalUserComponent implements AfterViewInit{
  
  //By default display Physician (role-id = 2)
  roleId: number = 2;
  
  displayedColumns: string[] = ['employeeId', 'firstname', 'lastname', 'dateOfJoining', 'status' ];
  dataSource = new  MatTableDataSource<HospitalUserData>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService : RegisterUserService, private _Activatedroute:ActivatedRoute, 
    private _liveAnnouncer: LiveAnnouncer, private toast: NgToastService) {
    this._Activatedroute.params.subscribe(params => { 
      this.roleId = params['roleId'];   
      console.log("RoleId "+this.roleId);
      userService.displayUser(this.roleId).subscribe({
        next: (response) => {
          // let userData = response.map((user) => {
          //   if(user.firstName == null){
          //     user.firstName = '--';
          //   }
          //   if(user.lastName == null){
          //     user.lastName = '--';
          //   }
          //   return user;
          // })
          this.dataSource.data = response as HospitalUserData[];
        },
        error: (e) => {
         console.log(e);
        }
      })
    });
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

  onToggle(checked: boolean, employeeId: string){
    console.log(checked);
    let requestBody = {
      employeeId: employeeId,
      status: checked
    }
    this.userService.changeStatusOfUser(requestBody).subscribe({
      next: (response) => {
        this.toast.success({ detail: "Status changed", summary: "" , duration: 100, sticky: true });
      },
      error: (err) => {
        this.toast.success({ detail: "Failed", summary: "Something went wrong" , duration: 100, sticky: true });
      }
    })
  }
}

