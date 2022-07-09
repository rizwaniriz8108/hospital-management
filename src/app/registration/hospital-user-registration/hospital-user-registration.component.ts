import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-hospital-user-registration',
  templateUrl: './hospital-user-registration.component.html',
  styleUrls: ['./hospital-user-registration.component.css']
})
export class HospitalUserRegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    title : new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [ Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
    //dob : new FormControl('', [Validators.required])
  });

  onSubmit(){
    //alert(this.registerForm.get("title")?.value);
  }
}
