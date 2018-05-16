import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { ImageService } from '../images/image.service';

@Component({
  selector: 'app-browse-images',
  templateUrl: './browse-images.component.html',
  styleUrls: ['./browse-images.component.css']
})
export class BrowseImagesComponent implements OnInit {

  images: any[] = [];

  constructor(private readonly image: ImageService) { }

  ngOnInit() {
    this.image.getImages()
      .subscribe(res => this.images = res);
  }

}
