import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginModule } from './login/login.module';
import { RegistrationModule } from './registration/registration.module';
import { DisplayUsersModule } from './display-users/display-users.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import {NgToastModule} from 'ng-angular-popup';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { SchedularComponent } from './schedular/schedular.component';
import { BookAppointmentComponent } from './patient/book-appointment/book-appointment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselComponent } from './carousel/carousel.component';
import { CollapseModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { AppointmentDialogComponent } from './patient/appointment-dialog/appointment-dialog.component';
import { ExtraDetailComponent } from './patient/extra-detail/extra-detail.component';
import { VitalDetailsComponent } from './patient/vital-details/vital-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SchedularComponent,
    BookAppointmentComponent,
    CarouselComponent,
    AppointmentDialogComponent,
    ExtraDetailComponent,
    VitalDetailsComponent
  ],
  imports: [
    NgToastModule,
    BrowserModule,
    ScheduleModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DashboardModule,
    MDBBootstrapModule.forRoot(),
    CollapseModule,
    LoginModule,
    RegistrationModule,
    DisplayUsersModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    DateTimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
