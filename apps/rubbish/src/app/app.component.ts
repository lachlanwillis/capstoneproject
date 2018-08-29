import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  title: string;
  hide: boolean;
  home: boolean;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.router.events.subscribe(data => {
      if (data instanceof RoutesRecognized) {
        this.title = data.state.root.firstChild.data.title;
        this.hide = data.state.root.firstChild.data.hide;
        this.home = data.state.root.firstChild.data.home;
       }
    });
  }

  async ngAfterViewInit() {
    const logged = await this.auth.isLoggedIn().toPromise();
    if (!logged) return;
    navigator.geolocation.getCurrentPosition((position) => {
      this.auth.setPostcode(position).subscribe(() => {});
    });
  }

}
