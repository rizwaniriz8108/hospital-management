import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  greetMessage : string = '';
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.userRole.next("ROLE_Patient");
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let firstname = this.authService.getUserFirstName();
    if(hours < 12){
      this.greetMessage = "Good Morning, "+firstname;
    }else if(hours >= 12 && hours <= 17){
      this.greetMessage = "Good Afternoon, "+firstname;
    }else if(hours > 17 && hours <= 24){
      this.greetMessage = "Good Evening, "+firstname;
    }
  }

}
