import { Component } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 

  title: string;
  hide: boolean;

  constructor(
    private readonly route: ActivatedRoute, 
    private readonly router: Router
  ) { 
    this.router.events.subscribe(data =>{
      if (data instanceof RoutesRecognized) {
        this.title = data.state.root.firstChild.data.title;
        this.hide = data.state.root.firstChild.data.hide;
       }
    });
  }
}
