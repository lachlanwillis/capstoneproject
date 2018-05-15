import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-browse-images',
  templateUrl: './browse-images.component.html',
  styleUrls: ['./browse-images.component.css']
})
export class BrowseImagesComponent implements OnInit {

  images: any[] = [];

  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('/api/display-image')
      .pipe(take(1), map(res => res.filter(a => !!a.fileName)))
      .subscribe(res => this.images = res);
  }

}
