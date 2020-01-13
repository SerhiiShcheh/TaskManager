import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: any;
  dayRegExp = /\d{4}-\d{2}-\d{2}/;
  timeRegExp = /\d{}/
  constructor(private dataService: DataService, private amplifyService: AmplifyService) { }

  ngOnInit() {
    let userEmail = this.amplifyService.auth().user.attributes.email;
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
