import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: any;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    let userEmail = this.dataService.currentUser.email;
    this.tasks = this.dataService.getAllUserTasks(userEmail).map((item) => {

      item.date = new Date(item.date);

      item.receivedFrom = item.assignedTo.find((item) => {
        if (item.userEmail === userEmail) {
          return true;
        }
      }).receivedFrom;

      return item;
    });
  }

}
