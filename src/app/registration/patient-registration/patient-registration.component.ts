import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl }
  from '@angular/forms'
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { PatientRegistrationService } from 'src/app/shared/Patient/patient-registration.service';

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: ['./patient-registration.component.css']
})
export class PatientRegistrationComponent implements OnInit {
  dob :any;

  constructor(private patientSerive:PatientRegistrationService , private toast: NgToastService,
     private route : Router) { }

  ngOnInit(): void {
    this.hideloader();
  }

  showLoader(){
    document.getElementById('loading')
    .style.display = 'block';
  }

  hideloader() {
    // Setting display of spinner
    // element to none
    document.getElementById('loading')
        .style.display = 'none';
}

  registerForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')),
    confirmPassword: new FormControl('', Validators.required),
    contactNumber : new FormControl('', Validators.required)
  },
    { validators: confirmPasswordValidator });

  onSubmit() {
    if(this.registerForm.valid === false){
      alert("Please fill all details");
    }
    else{
      this.showLoader();
      let requestBody = {
        title : this.registerForm.value.title,
        firstName : this.registerForm.value.firstname,
        lastName : this.registerForm.value.lastname,
        emailId : this.registerForm.value.email,
        dateOfBirth : "10/10/1998" ,//this.registerForm.value.dob,
        contactNumber : this.registerForm.value.contactNumber,  
        password : this.registerForm.value.password
      };
      console.log(requestBody);
      this.patientSerive.registerPatient(requestBody).subscribe({
        next : (response) => {
          this.hideloader();
          this.toast.success({ detail : response.message , summary : "" , duration : 2000 });
          
          this.route.navigate(['login']);
        },
        error: (e) => {
          this.hideloader();
          console.log(e);
          this.toast.error({ detail: "Something went wrong", summary: "Please try again", duration: 2000 });
        }
      })
    }
  }
  dateChanged($event: any){
    this.dob =  $event.target.value;
    console.log(this.dob);
    
  }
}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value ? null : { invalid: true };
};

//   constructor() { }

//   ngOnInit(): void {
//   }

//   registerForm = new FormGroup({
//     title: new FormControl('', [Validators.required]),
//     gender: new FormControl('', [Validators.required]),
//     firstname: new FormControl('', [Validators.required]),
//     lastname: new FormControl('', [Validators.required]),
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')),
//     confirmPassword: new FormControl('', Validators.required)
//   },
//     { validators: confirmPasswordValidator });

//   onSubmit() {
//     if(this.registerForm.valid == false){
//       return;
//     }
//   }

// }
// export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//   const password = control.get('password');
//   const confirmPassword = control.get('confirmPassword');

//   return password && confirmPassword && password.value === confirmPassword.value ? null : { invalid: true };
// };
