import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  sent = false;

  emailFormControl = new FormControl('email', [
    Validators.required
  ]);

  constructor(
    private readonly auth: AuthService
  ) { }

  submit(): void {
    const { value } = this.emailFormControl;

    if (!value) {
      return;
    } else {
      if (value.split('@').length <= 1) {
        return;
      }
      this.auth.resetPassword(value)
        .subscribe(() => (this.sent = true));
    }

  }

}
