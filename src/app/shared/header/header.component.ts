import { Component, OnInit, Input } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() currentUser: any;

  constructor(
    private amplifyService: AmplifyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  signOut() {
    this.amplifyService.auth().signOut().then(data => {
      this.router.navigate(['/login']);
    }).catch(err => {
      console.log(err);
    });
  }

}
