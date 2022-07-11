import { Component, OnInit } from '@angular/core';
import {DashboardService} from 'src/app/shared/dashboard.service';

@Component({
  selector: 'app-admin-dashboard-cards',
  templateUrl: './admin-dashboard-cards.component.html',
  styleUrls: ['./admin-dashboard-cards.component.css']
})
export class AdminDashboardCardsComponent implements OnInit {

  greetMessage : string = '';
  constructor(private dashboardService : DashboardService) { }

  physicianCount : number = 0;
  nurseCount : number = 0;
  patientCount : number = 0;

  ngOnInit(): void {
    let currentDate = new Date();
    let hours = currentDate.getHours();
    if(hours < 12){
      this.greetMessage = "Good Morning, Admin";
    }else if(hours >= 12 && hours <= 17){
      this.greetMessage = "Good Afternoon, Admin";
    }else if(hours > 17 && hours <= 24){
      this.greetMessage = "Good Evening, Admin";
    }
   this.getAllUserCount();
  }

  getAllUserCount(){
    this.dashboardService.getAllUsersCount().subscribe({
      next: (response) => {
        this.physicianCount = response.physicianCount;
        this.nurseCount = response.nurseCount;
        this.patientCount = response.patientCount;
      }
    })
  }

}
