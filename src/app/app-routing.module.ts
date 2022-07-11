import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardCardsComponent } from './dashboard/admin-dashboard-cards/admin-dashboard-cards.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { NurseComponent } from './dashboard/nurse/nurse.component';
import { PatientComponent } from './dashboard/patient/patient.component';
import { PhysicianComponent } from './dashboard/physician/physician.component';
import { DisplayHospitalUserComponent } from './display-users/display-hospital-user/display-hospital-user.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { UserLoginComponent } from './login/user-login/user-login.component';
import { HospitalUserRegistrationComponent } from './registration/hospital-user-registration/hospital-user-registration.component';
import { PatientRegistrationComponent } from './registration/patient-registration/patient-registration.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'login', component: UserLoginComponent
      },
      {
        path: 'patient/registration', component: PatientRegistrationComponent
      },
      {
        path: 'forgot-password', component: ForgotPasswordComponent
      }
    ]
  },
  {
    path: 'physician/dashboard', component: PhysicianComponent
  },
  {
    path: 'nurse/dashboard', component: NurseComponent
  },
  {
    path: 'patient/dashboard', component: PatientComponent
  },
  {
    path: 'patient-registration', component: PatientRegistrationComponent
  },

  {
    path: 'admin', component: AdminComponent,
    children: [
      {
        path: 'dashboard', component: AdminDashboardCardsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'user-registration', component: HospitalUserRegistrationComponent, canActivate: [AuthGuard]
      },
      {
        path: 'display-user/:roleId', component: DisplayHospitalUserComponent, canActivate: [AuthGuard]
      }
    ]
  }
  ,
  {
    path: 'change-password', component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
