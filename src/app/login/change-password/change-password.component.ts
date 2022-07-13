import { Component, OnInit } from '@angular/core';
import { AbstractControl ,FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/authentication.service';

import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private authService : AuthenticationService, private toast: NgToastService, 
    private route: Router) { }

  changePasswordForm = new FormGroup({
    defaultPassword : new FormControl('', [Validators.required]),
    newPassword :  new FormControl('', Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')),
    confirmPassword : new FormControl('', [Validators.required]),
  }, 
  { validators: confirmPasswordValidator });


  ngOnInit(): void {
  }

  onSubmit(){
    if(this.changePasswordForm.valid === false){
      return ;
    }
    let requestBody = {
      changePassword : this.changePasswordForm.value.newPassword,
      defaultPassword : this.changePasswordForm.value.defaultPassword
    }
    this.authService.changePassword(requestBody).subscribe({
      next: (response) => {
        if(response.httpStatus === 'OK'){
          this.toast.success({ detail: response.message, summary: "Login with new password", duration: 2000});
          localStorage.removeItem("token");
          this.route.navigate(['login']);
        }
      },
      error: (err) => {
        console.log(err);
        this.toast.error({ detail: err.message, summary: "something went wrong.", duration: 2000});
      }
    })
  }

}
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value ? null : { invalid: true };
};
