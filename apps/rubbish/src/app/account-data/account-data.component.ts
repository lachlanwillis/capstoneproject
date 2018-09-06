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
    console.log(event.target.value);
    this.updatedName = event.target.value;
    console.log(this.updatedName);
  }

  changeEmail(event) {
    this.updatedEmail = event.target.value;
  }


  updateInformation() {
    
    if (this.user.leaderboardVisible) {
      // Opt into the leaderboards

      console.log(this.user.leaderboardVisible);

      this.updateLeaderboardVis(true).subscribe((value: any) => {
        if (value.success) {}});
    

    } else if (!this.user.leaderboardVisible) {
      // Opt out of the leaderboards
      
      this.updateLeaderboardVis(false).subscribe((value: any) => {
        if (value.success) {}});


    }

    if (this.updatedName != this.user.name && this.updatedName) {
      // Update Name
      
      this.updateName().subscribe((value: any) => {})
    }

    if (this.updatedEmail != this.user.email && this.updatedEmail) {
      // Update Email
      this.updateEmail().subscribe((value: any) => { })


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

  updateName() {
    return this.http.put<any[]>('/api/user/changename', { name: this.updatedName }).pipe(take(1));
  }

  updateEmail() {
    return this.http.put<any[]>('/api/user/changeemail', { email: this.updatedEmail }).pipe(take(1));
  }


  loadData () {
    this.auth.getCurrentUser()
      .subscribe(user => this.user = user);
    console.log(this.user);
  }

}
