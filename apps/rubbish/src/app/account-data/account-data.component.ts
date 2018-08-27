import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss']
})
export class AccountDataComponent implements OnInit {

  user?: any;
  updatedName: string;
  updatedEmail: string;

  constructor(
    private readonly auth: AuthService
  ) { }

  ngOnInit() {
    this.loadData();
    
  }


  changeName(event) {
    this.updatedName = event.target.value;
  }

  changeEmail(event) {
    this.updatedEmail = event.target.value;
  }


  updateInformation() {
    console.log("test1");
    if (this.user.leaderboardVisible) {
      // Opt into the leaderboards
      console.log(this.user.leaderboardVisible);

    } else if (!this.user.leaderboardVisible) {
      // Opt out of the leaderboards
      console.log(this.user.leaderboardVisible);
    }

    if (this.updatedName != this.user.name) {
      // Update Name
    }
    if (this.updatedEmail != this.user.email) {
      // Update Email
    }


  }

  loadData () {
    this.auth.getCurrentUser()
      .subscribe(user => this.user = user);
  }

}
