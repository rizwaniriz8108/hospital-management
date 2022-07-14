import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-physician',
  templateUrl: './physician.component.html',
  styleUrls: ['./physician.component.css']
})
export class PhysicianComponent implements OnInit {

  greetMessage : string = '';
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.userRole.next("ROLE_Physician");
    let currentDate = new Date();
    let hours = currentDate.getHours();
    if(hours < 12){
      this.greetMessage = "Good Morning, Physician";
    }else if(hours >= 12 && hours <= 17){
      this.greetMessage = "Good Afternoon, Physician";
    }else if(hours > 17 && hours <= 24){
      this.greetMessage = "Good Evening, Physician";
    }
  }

}
