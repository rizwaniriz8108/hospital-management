import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalUserRegistrationComponent } from './hospital-user-registration/hospital-user-registration.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HospitalUserRegistrationComponent,
    PatientRegistrationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HospitalUserRegistrationComponent,
    PatientRegistrationComponent
  ]
})
export class RegistrationModule { }
