import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss']
})
export class AccountDataComponent implements OnInit {

  user?: any;
  updatedName: string;
  updatedEmail: string;
  userId: string;

  constructor(
    private readonly auth: AuthService,
    private readonly http: HttpClient
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
    
    if (this.user.leaderboardVisible) {
      // Opt into the leaderboards

      console.log(this.user.leaderboardVisible);

      this.updateLeaderboardVis(true).subscribe((value: any) => {
        if (value.success) {
          this.loadData();
        }
        });
    

    } else if (!this.user.leaderboardVisible) {
      // Opt out of the leaderboards
      
      this.updateLeaderboardVis(false).subscribe((value: any) => {
        if (value.success) {
          this.loadData();
        }
      });


    }

    if (this.updatedName != this.user.name) {
      // Update Name
    }
    if (this.updatedEmail != this.user.email) {
      // Update Email
    }


  }


  updateLeaderboardVis(isVis: boolean) {
    if (isVis) {
      return this.http.put<any[]>('/api/user/optin', this.user.id).pipe(take(1));
    }
    else if (!isVis) {
      return this.http.put<any[]>('/api/user/optout', this.user.id).pipe(take(1));
    }
  }


  loadData () {
    this.auth.getCurrentUser()
      .subscribe(user => this.user = user);
    console.log(this.user);
  }

}
