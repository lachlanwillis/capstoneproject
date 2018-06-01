import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnDestroy {

  loggedIn = false;
  admin = false;

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

    ngOnDestroy() {
      this.loggedSub.unsubscribe();
      this.adminSub.unsubscribe();
    }
}
