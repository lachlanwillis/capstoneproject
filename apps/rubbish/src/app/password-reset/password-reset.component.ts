import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly auth: AuthService,
    private readonly router: Router
  ) { }

  passwordFormControl = new FormControl('password');

  submit(): void {
    const { token } = this.route.snapshot.params;
    this.auth.sendPasswordReset(token, this.passwordFormControl.value)
      .subscribe(x => this.router.navigateByUrl('/login'));
  }

}
