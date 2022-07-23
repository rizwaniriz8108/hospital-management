import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from 'src/app/shared/authentication.service';

import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private authService : AuthenticationService, private toast: NgToastService, 
    private route: Router) { }

  forgotPasswordForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email])
  });

  onSubmit(){
    if(this.forgotPasswordForm.valid === false){
      return ;
    }
    this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe({
      next: (response) => {
        this.toast.success({ detail: "Mail sent", summary: response.message, duration: 2000});
        this.route.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
        this.toast.error({ detail: "Something went wrong", summary: "", duration: 2000});
      }
    })
  }

  ngOnInit(): void {
    
  }

 

}
