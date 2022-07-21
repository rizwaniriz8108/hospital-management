import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { RegisterUserService } from 'src/app/shared/register-user.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-hospital-user-registration',
  templateUrl: './hospital-user-registration.component.html',
  styleUrls: ['./hospital-user-registration.component.css']
})
export class HospitalUserRegistrationComponent implements OnInit {

  constructor(private userRegisterService: RegisterUserService, private toast: NgToastService, 
    private route: Router, private authService : AuthenticationService) {
     }

  ngOnInit(): void {
    this.authService.userRole.next("ROLE_Admin");
    this.hideloader();
  }

  registerForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    specialization: new FormControl()
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

  showSpeciality : boolean = false;
  enableSpeciality(value){
    console.log(value);
    if(value == 2){
      this.showSpeciality = true;
    }else{
      this.showSpeciality = false;
    }
  }

  showLoader(){
    document.getElementById('loading')
    .style.display = 'block';
    // document.getElementById('loader')
    // .style.display = 'block';
  }

  hideloader() {
    // Setting display of spinner
    // element to none
    document.getElementById('loading')
        .style.display = 'none';
        // document.getElementById('loader')
        // .style.display = 'none';
}

  onSubmit() {
    if (this.registerForm.valid === false) {
      alert("Please fill all the details.")
    } else {
      this.showLoader();
      let requestBody = {
        title: this.registerForm.value.title,
        firstName: this.registerForm.value.firstname,
        lastName: this.registerForm.value.lastname,
        emailId: this.registerForm.value.email,
        dateOfBirth: this.registerForm.value.dob,
        status: true,
        roleId: this.registerForm.value.role,
        specialization: this.registerForm.value.specialization
      };
      console.log(requestBody);
      this.userRegisterService.registerUser(requestBody).subscribe({
        next: (response) => {
          this.hideloader();
          this.toast.success({ detail: response.message, summary: "", duration: 2000, sticky: true });
          //this.clearFormFields();
          if(this.registerForm.value.role == 2){
            this.route.navigate(['/admin/display-user/2']);
          }
          else{
            this.route.navigate(['/admin/display-user/3']);
          }
          
          this.registerForm.markAsUntouched();
        },
        error: (e) => {
          this.hideloader();
          this.toast.error({ detail: e.message, summary: "Please try again", duration: 2000, sticky: true });
        }
      });
    }
  }
}
