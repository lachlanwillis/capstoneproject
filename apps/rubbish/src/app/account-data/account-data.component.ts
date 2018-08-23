import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-account-data',
  templateUrl: './account-data.component.html',
  styleUrls: ['./account-data.component.scss']
})
export class AccountDataComponent implements OnInit {

  user?: any;

  constructor(
    private readonly auth: AuthService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData () {
    this.auth.getCurrentUser()
      .subscribe(user => this.user = user);
  }

}
