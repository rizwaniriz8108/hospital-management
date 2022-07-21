import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, max, min, Observable, startWith } from 'rxjs';
import { RegisterUserService } from 'src/app/shared/register-user.service';
import { SchedularService } from 'src/app/shared/schedular/schedular.service';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NgToastService } from 'ng-angular-popup';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.css']
})
export class AppointmentDialogComponent implements OnInit {

  response: any[];
  specialization: string[];
  selectedSpecialization: string;
  availablePhysicians: any[];
  availableAppointments: any[];
  employeeId: string;
  minDate : Date;
  maxDate : Date;
  

  constructor(private userService: RegisterUserService, private schedularService: SchedularService,
    private authService: AuthenticationService, private toast: NgToastService, 
    public dialogRef: MatDialogRef<AppointmentDialogComponent>, private route : Router) {
    this.getSpecialization();
  }

  myControl = new FormControl();
  filteredOptions = new Observable<string[]>();

  ngOnInit(): void {
    this.authService.userRole.next("ROLE_Patient");
    this.getSpecialization();
  }

  getSpecialization() {
    this.userService.getPhysicianDetails().subscribe({
      next: (response) => {
        this.response = response;
        this.specialization = response.map(data => data.specialization)
          .filter((value, index, self) => self.indexOf(value) === index);

        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      }
    });
  }

  selectOption(e: MatAutocompleteSelectedEvent) {
    this.selectedSpecialization = e.option.value;
    this.availablePhysicians = this.response.filter(data => data.specialization === this.selectedSpecialization);
    console.log(this.selectedSpecialization);

  }

  selectedPhysician(employeeId) {
    this.employeeId = employeeId;
    console.log(this.employeeId);
    this.schedularService.getEventsByEmployeeId(this.employeeId).subscribe({
      next: (res) => {
        let minDate = new Date(res[0].startTime);
        let maxDate = new Date(res[res.length - 1].endTime);
        let minTime = '';
        let maxTime = '';
        let minDateInString = '';
        let maxDateInString = '';
        minDateInString = minDate.getMonth() + "/" + minDate.getDate() + "/" +  minDate.getFullYear();
        maxDateInString = maxDate.getMonth() + "/" + maxDate.getDate() + "/" +  maxDate.getFullYear();
        
        if(minDate.getHours() === 12){
          minTime = minDate.getHours() + ":" + minDate.getMinutes();
          if(minDate.getMinutes().toString().length === 1){
            minTime += "0";
          }
          minTime += " PM";
        }else if(minDate.getHours() >= 12){
          minTime = minDate.getHours() - 12 + ":" + minDate.getMinutes();
          if(minDate.getMinutes().toString().length === 1){
            minTime += "0";
          }
          minTime += " PM";
        }else{
          minTime = minDate.getHours() + ":" + minDate.getMinutes();
          if(minDate.getMinutes().toString().length === 1){
            minTime += "0";
          }
          minTime += " AM";
        }

        if(maxDate.getHours() === 12){
          maxTime = maxDate.getHours() + ":" + maxDate.getMinutes();
          if(maxDate.getMinutes().toString().length === 1){
            maxTime += "0";
          }
          maxTime += " PM";
        }else if(maxDate.getHours() > 12){
          maxTime = maxDate.getHours() - 12 + ":" + maxDate.getMinutes();
          if(maxDate.getMinutes().toString().length === 1){
            maxTime += "0";
          }
          maxTime += " PM";
        }else{
          maxTime = maxDate.getHours() + ":" + maxDate.getMinutes();
          if(maxDate.getMinutes().toString().length === 1){
            maxTime += "0";
          }
          maxTime += " AM";
        }

        // if(minTime.length === 6){
          
        // }

        // if(maxTime.length === 6){
        //   maxTime += "0";
        // }

        minDateInString += " "+minTime;
        maxDateInString += " "+maxTime;

        console.log(minDateInString + " and " + maxDateInString);
        this.minDate = new Date(minDateInString);
        this.maxDate = new Date(maxDateInString);

        
      }
    });

    // this.schedularService.getAvailableAppointmentsByEmployeeId(this.employeeId).subscribe({
    //   next: (response) => {
    //     this.availableAppointments = response;
    //   }
    // })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.specialization.filter(option => option.toLowerCase().includes(filterValue));
  }

  submitData(value){
    console.log(this.selectedSpecialization + " - " +this.employeeId + " - " +value);
    // let id = this.availableAppointments.filter(data => data.startTime === value).map(data => data.id);
    // console.log("Timeslot id" + id);
    if( this.employeeId === '' || this.employeeId === null || value === '' || value === null){
      return;
    }

    let requestBody = {
        startTime: value,
        doctorId: this.employeeId,
        patientId: JSON.parse(atob(localStorage.getItem("token").split(".")[1])).employeeId
    }
    this.schedularService.sendBookingRequest(requestBody).subscribe({
      next: (response) => {
        this.toast.success({ detail: response.message, summary: "", duration: 1000});
        //this.route.navigate(['patient/book-appointment']);
        this.dialogRef.close();
      },
      error: (err) => {
        this.toast.error({detail: "Something went wrong", duration: 1000});
        this.dialogRef.close();
      }
    })
  }


}
