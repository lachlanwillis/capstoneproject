import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  loginFormControl = new FormControl('email', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('password', [
    Validators.required
  ]);

  login: boolean = true;

  constructor(private readonly auth: AuthService,
              private readonly router: Router,
              private readonly snack: MatSnackBar) { }

  onSubmit() {

    const email = this.loginFormControl.value;
    const password = this.passwordFormControl.value;

    if (this.login) {
      this.auth.login(email, password)
        .subscribe(success => { 
          if (success) { this.snack.open('Login successful!', "Sweet!", { duration: 3000 }); this.router.navigateByUrl('/'); } 
          else this.snack.open('Incorrect login details');
        }, () => this.snack.open('An unexpected errorr occurred. Your login details may not be correct.'));
    } else {
      this.auth.signup(email, password)
        .subscribe(success => {
          if (success) { this.snack.open('Signup successful!', "Sweet!", { duration: 3000 }); this.router.navigateByUrl('/verify'); }
          else this.snack.open('An unexpected error occurred. Your email may not be valid.');
        }, (e) => this.snack.open(e.error.message));
    }
  }

  loginToFacebook(): void {
    window.location.pathname = '/api/auth/facebook';
  }

  loginToGoogle(): void {
    window.location.pathname = '/api/auth/google';
  }

}