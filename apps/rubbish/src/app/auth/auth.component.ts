import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  loginFormControl = new FormControl('username', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('password', [
    Validators.required
  ]);

  login: boolean = true;

  constructor(private readonly auth: AuthService,
              private readonly router: Router,
              private readonly snack: MatSnackBar) { }

  onSubmit(form: any) {

    const username = this.loginFormControl.value;
    const password = this.passwordFormControl.value;

    if (this.login) {
      this.auth.login(username, password)
        .subscribe(success => { 
          if (success) this.router.navigateByUrl('/'); 
          else this.snack.open('Incorrect login details');
        });
    } else {
      this.auth.signup(username, password)
        .subscribe(success => {
          if (success) this.router.navigateByUrl('/');
          else this.snack.open('An unexpected error occured.');
        });
    }
  }

}