import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-cards',
  templateUrl: './admin-dashboard-cards.component.html',
  styleUrls: ['./admin-dashboard-cards.component.css']
})
export class AdminDashboardCardsComponent implements OnInit {

  greetMessage : string = '';
  constructor() { }

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
  }

}
