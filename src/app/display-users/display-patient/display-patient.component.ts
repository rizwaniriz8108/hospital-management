import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DisplayDataService } from 'src/app/shared/Patient/display-data.service';
import { Router } from '@angular/router';

export interface PatientData{
  id: number;
  firstname: string;
  lastname: string;
  emailId: string;
  contactNumber: string;
}

@Component({
  selector: 'app-display-patient',
  templateUrl: './display-patient.component.html',
  styleUrls: ['./display-patient.component.css']
})
export class DisplayPatientComponent implements OnInit {


  displayedColumns: string[] = ['firstname', 'lastname', 'emailId', 'contactNumber', 'action' ];
  dataSource = new  MatTableDataSource<PatientData>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService : AuthenticationService, private _liveAnnouncer: LiveAnnouncer, 
              private displayPatientService : DisplayDataService, private router : Router) {

               }
  patientData : PatientData[] = [];
  ngOnInit(): void {
    this.authService.userRole.next("ROLE_Physician");
    this.displayPatientService.getPatientAllData().subscribe({
      next: (response) => {
         
          response.map(responseData => {
            let data : PatientData = {
              id: 0,
              firstname: '',
              lastname: '',
              emailId: '',
              contactNumber: ''
            };
            data.firstname = responseData.firstName;
            data.lastname = responseData.lastName;
            data.emailId = responseData.emailId;
            data.id = responseData.patientId;
            data.contactNumber = responseData.contactNumber;
            this.patientData.push(data);
          });

          this.dataSource.data = this.patientData;
      }
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

  navigateToVitalDetails(patientId){
    this.router.navigate(['physician/add-vital-details/'+patientId]);
  }

}
