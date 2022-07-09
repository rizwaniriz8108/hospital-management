import { Component, OnInit } from '@angular/core';
import { AbstractControl ,FormControl, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor() { }

  changePasswordForm = new FormGroup({
    defaultPassword : new FormControl('', [Validators.required]),
    newPassword :  new FormControl('', Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')),
    confirmPassword : new FormControl('', [Validators.required]),
  }, 
  { validators: confirmPasswordValidator });


  ngOnInit(): void {
  }

  onSubmit(){
    
  }

}
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value ? null : { invalid: true };
};
