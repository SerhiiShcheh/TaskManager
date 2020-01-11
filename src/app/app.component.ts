import { Component, OnInit, OnDestroy } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TaskManager';
  currentUser = null;
  authStateSubscription;

  constructor(private amplifyService: AmplifyService) {}

  ngOnInit() {
    this.subscribeAuthState();
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
