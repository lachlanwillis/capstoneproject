import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnDestroy {

  loggedIn = false;
  admin = false;
  currentRank: number;
  xpNext: number;

  isNavbarCollapsed = true;

  loggedSub = new Subscription();
  adminSub = new Subscription();

  constructor(public readonly auth: AuthService,
              private readonly router: Router) {

    this.auth.isLoggedIn()
      .pipe(take(1))
      .subscribe(value => this.loggedIn = value);

    this.auth.isAdmin()
      .pipe(take(1))
      .subscribe(value => this.admin = value);

    this.auth.loginChanged()
      .subscribe(() => {
        this.loggedSub = this.auth.isLoggedIn()
          .subscribe(value => this.loggedIn = value);
        this.adminSub = this.auth.isAdmin()
          .subscribe(value => this.admin = value);
      });

    }

    logout() {
      this.auth.logout()
        .subscribe(() => this.router.navigateByUrl('/'));
    }


    getCurrentLevel() {
      if (this.loggedIn == false) {
        this.auth.getCurrentUser().subscribe(user => {
          if (user.points < 10) {
            this.currentRank = 1
          } else {
            // This bit determines the user's rank - current: sqrt(points/10)
            this.currentRank = Math.floor(Math.pow(parseFloat(user.points) / 10.0, 0.5)) + 1;
          }

          
          this.xpNext = (((this.currentRank) * (this.currentRank)) * 10) - user.points;
          console.log(this.xpNext);
        });
      }
      
    }

    ngOnDestroy() {
      this.loggedSub.unsubscribe();
      this.adminSub.unsubscribe();
    }

    ngOnChanges() {
      this.getCurrentLevel();
    }
    ngOnInit() {
      this.getCurrentLevel();
    }

}
