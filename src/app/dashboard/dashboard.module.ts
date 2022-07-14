import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhysicianComponent } from './physician/physician.component';
import { NurseComponent } from './nurse/nurse.component';
import { PatientComponent } from './patient/patient.component';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { AdminDashboardCardsComponent } from './admin-dashboard-cards/admin-dashboard-cards.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainPageComponent } from './main-page/main-page.component';



@NgModule({
  declarations: [
    PhysicianComponent,
    NurseComponent,
    PatientComponent,
    AdminDashboardCardsComponent,
    SideNavbarComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    PhysicianComponent,
    NurseComponent,
    PatientComponent,
    AdminDashboardCardsComponent,
    SideNavbarComponent,
    MainPageComponent
  ]
})
export class DashboardModule { }
