import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let requestObj = {
      username: this.username,
      password: this.password
    }
    this.authService.authenticateUser(requestObj).subscribe({
      next: (response) => {
        localStorage.setItem("token", response.token);
        let role = JSON.parse(atob(response.token.split(".")[1])).roles[0].authority;
        if(role === 'ROLE_Admin'){
          this.route.navigate(['admin/dashboard'])
        }
        if(role === 'ROLE_Physician'){
          this.route.navigate(['admin/dashboard'])
        }
        if(role === 'ROLE_Nurse'){
          this.route.navigate(['admin/dashboard'])
        }
        if(role === 'ROLE_Patient'){
          this.route.navigate(['admin/dashboard'])
        }
      },
      error: (e) => {
        // this.inValidLogin = true;
        // this.errorMessage = e.message;
        this.toastr.error(e.message, "Login failed");
      }
    })
  }

}
