import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  inValidLogin: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private route: Router,
    private toast: NgToastService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") != null) {
      this.authService.logout().subscribe({
        next: (response) => {
          console.log(response);
          localStorage.removeItem("token");
        },

        error: (err) => console.error(err)
      });
    }

  }

  onSubmit() {
    if (this.username === '' || this.password === '' || this.username === ' ' || this.password === ' ') {
      return;
    }
    let requestObj = {
      username: this.username,
      password: this.password
    }
    this.authService.authenticateUser(requestObj).subscribe({
      next: (response) => {
        localStorage.setItem("token", response.token);
        this.toast.success({ detail: "Login success", summary: "Welcome, " + this.username, duration: 2000, sticky: true });
        let role = JSON.parse(atob(response.token.split(".")[1])).roles[0].authority;
        //SETTING THE ROLE VALUE 
        this.authService.userRole.next(role);
        if (role === 'ROLE_Admin') {
          if (response.passwordChanged) {
            this.route.navigate(['admin/dashboard'])
          }else{
            this.toast.success({ detail: "Login success", summary: "Please change your password", duration: 2000, sticky: true });
            this.route.navigate(['change-password']);
          }
        }
        if (role === 'ROLE_Physician') {
          if (response.passwordChanged) {
            this.route.navigate(['physician/dashboard'])
          } else {
            this.toast.success({ detail: "Login success", summary: "Please change your password", duration: 2000, sticky: true });
            this.route.navigate(['change-password']);
          }

        }
        if (role === 'ROLE_Nurse') {
          if (response.passwordChanged) {
            this.route.navigate(['nurse/dashboard'])
          } else {
            this.toast.success({ detail: "Login success", summary: "Please change your password", duration: 2000, sticky: true });
            this.route.navigate(['change-password']);
          }
        }
        if (role === 'ROLE_Patient') {
          if (response.passwordChanged) {
            this.route.navigate(['patient/dashboard'])
          } else {
            this.route.navigate(['change-password']);
          }
        }
      },
      error: (e) => {
        this.inValidLogin = true;
        console.log(e.message.toString());
        if (e.error.message === "Bad credentials") {
          this.toast.error({ detail: "Bad Credentials", summary: "Please try again", duration: 2000, sticky: true });
        }
         
        if (e.error.message === "User is Unauthorized" || e.error.message === "Invalid Token") {
          this.toast.error({ detail: "Login failed", summary: "Please try again", duration: 2000, sticky: true });
        } 
        
        if(e.error.httpStatus === 'BAD_REQUEST'){
          this.toast.error({ detail: e.error.message, summary: "", duration: 2000, sticky: true });
        }

      }
    })
  }
}