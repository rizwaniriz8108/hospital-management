import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayHospitalUserComponent } from './display-hospital-user/display-hospital-user.component';
import { DisplayPatientComponent } from './display-patient/display-patient.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    DisplayHospitalUserComponent,
    DisplayPatientComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    DisplayHospitalUserComponent,
    DisplayPatientComponent
  ]
})
export class DisplayUsersModule { }
