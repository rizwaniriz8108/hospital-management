import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';

import { NgToastService } from 'ng-angular-popup';
import { PatientHealthDataService } from 'src/app/shared/Patient/patient-health-data.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

  role: string;
  showReportIcon : boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private route: Router,
    private authService: AuthenticationService, private toast: NgToastService,
    private vitalDetailService: PatientHealthDataService) { }

  ngOnInit(): void {
    this.authService.userRole.subscribe(role => this.role = role);
    let role = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).roles[0].authority;
    if (role === 'ROLE_Patient') { 
      let patientEmailId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).emailId;
      this.vitalDetailService.isVitalDetailsAvailable(patientEmailId).subscribe({
        next: (response) => {
          console.log(response);
          this.showReportIcon = true;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
   
  }

logout(){

  this.authService.logout().subscribe({
    next: (response) => {
      localStorage.removeItem("token");
      this.toast.success({ detail: "Logout successfully", summary: "", duration: 2000 });
    },
    error: (err) => {
      // this.toast.success({ detail: "Logout failed", summary: "Something went wrong" , duration: 2000, sticky: true });
    }
  })
  this.route.navigate(['login']);
}



downloadReport(){
  let userData = JSON.parse(atob(localStorage.getItem("token").split(".")[1]));
  let patientEmailId = userData.emailId;
  let firstname = userData.firstname;
  this.vitalDetailService.downloadReport(patientEmailId).subscribe((res) => {
    console.log(res);
    const file = res;
      const url = window.URL.createObjectURL(new Blob([res as BlobPart], { type: 'application/pdf' }));
  
      var link = document.createElement('a');
      document.body.appendChild(link);
      link.setAttribute('style', 'display: none');
      link.href = url;
      link.download = firstname+'.pdf';
      link.click();
  });
}
}
