import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { HospitalUserData } from 'src/app/shared/hospitalUserData';
import { RegisterUserService } from 'src/app/shared/register-user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-hospital-user',
  templateUrl: './display-hospital-user.component.html',
  styleUrls: ['./display-hospital-user.component.css']
})


export class DisplayHospitalUserComponent implements AfterViewInit{
  
  //By default display Physician (role-id = 2)
  roleId: number = 2;
  displayedColumns: string[] = ['employeeId', 'firstname', 'lastname', 'status', 'dateOfJoining'];
  dataSource !: MatTableDataSource<HospitalUserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService : RegisterUserService, private _Activatedroute:ActivatedRoute) {
    this._Activatedroute.params.subscribe(params => { 
      this.roleId = params['roleId'];   
      console.log("RoleId "+this.roleId);
      userService.displayUser(this.roleId).subscribe({
        next: (response) => {
          let userData = response.map((user) => {
            if(user.firstName == null){
              user.firstName = '--';
            }
            if(user.lastName == null){
              user.lastName = '--';
            }
            return user;
          })
          this.dataSource = new MatTableDataSource(userData);
        },
        error: (e) => {
         console.log(e);
        }
      })
    });
   
    
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
   // this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
//     ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
//     '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
//   };

// }