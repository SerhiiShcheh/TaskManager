import { Component, OnInit, OnDestroy } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TaskManager';
  currentUser = null;
  authStateSubscription;

  constructor(private amplifyService: AmplifyService, private dataService: DataService) {}

  ngOnInit() {
    this.subscribeAuthState();
    this.dataService.initStorage();
  }

  checkUser() {
    let user = this.amplifyService.auth().user;
    if (user) {
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }

  private subscribeAuthState() {
    this.authStateSubscription = this.amplifyService.authStateChange$.subscribe(authState => {
      if (!authState.user) {
        this.currentUser = null;
      } else {
        this.currentUser = authState.user;
      }
    });
  }
}
