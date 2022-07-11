import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { RegisterUserService } from 'src/app/shared/register-user.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-hospital-user-registration',
  templateUrl: './hospital-user-registration.component.html',
  styleUrls: ['./hospital-user-registration.component.css']
})
export class HospitalUserRegistrationComponent implements OnInit {

  constructor(private userRegisterService: RegisterUserService, private toast: NgToastService) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
    //dob : new FormControl('', [Validators.required])
  });

  // clearFormFields() {
  //     this.registerForm.value.title.markAsUntouched();
  //     this.registerForm.value.firstName.markAsUntouched();
  //     this.registerForm.value.lastName.markAsUntouched();
  //     this.registerForm.value.email.markAsUntouched();
  //     this.registerForm.value.dob.markAsUntouched();
  //     this.registerForm.value.role.markAsUntouched();
  // }

  onSubmit() {
    if (this.registerForm.valid === false) {
      alert("Please fill all the details.")
    } else {
      let requestBody = {
        title: this.registerForm.value.title,
        firstName: this.registerForm.value.firstname,
        lastName: this.registerForm.value.lastname,
        emailId: this.registerForm.value.email,
        dateOfBirth: this.registerForm.value.dob,
        status: true,
        roleId: this.registerForm.value.role
      };
      console.log(requestBody);
      this.userRegisterService.registerUser(requestBody).subscribe({
        next: (response) => {
          this.toast.success({ detail: response.message, summary: "", duration: 2000, sticky: true });
          //this.clearFormFields();
          this.registerForm.markAsUntouched();
        },
        error: (e) => {
          this.toast.error({ detail: e.message, summary: "Please try again", duration: 2000, sticky: true });
        }
      });
    }
  }
}
