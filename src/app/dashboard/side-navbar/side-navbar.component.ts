import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';

import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit{

  role: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private route : Router, 
    private authService : AuthenticationService, private toast: NgToastService) {}

  ngOnInit(): void {
    this.authService.userRole.subscribe(role => this.role = role);
  }

  logout(){
    
    this.authService.logout().subscribe({
      next: (response) => {
        localStorage.removeItem("token");
        this.toast.success({ detail: "Logout successfully", summary: "" , duration: 2000, sticky: true });
      },
      error: (err) => {
       // this.toast.success({ detail: "Logout failed", summary: "Something went wrong" , duration: 2000, sticky: true });
      }
    })
    this.route.navigate(['login']);
  }
}
