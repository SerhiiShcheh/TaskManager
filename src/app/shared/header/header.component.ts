import { Component, OnInit, Input } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() currentUser: any;

  constructor(private amplifyService: AmplifyService) { }

  ngOnInit() {
  }

  signOut() {
    this.amplifyService.auth().signOut().then(data => {
      console.log(data);
    }).catch(err => {
      console.log(err);
    });
  }

}
