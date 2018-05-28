import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { ImageService } from '../images/image.service';
import { Image } from '../image/image';

@Component({
  selector: 'app-browse-images',
  templateUrl: './browse-images.component.html',
  styleUrls: ['./browse-images.component.css']
})
export class BrowseImagesComponent implements OnInit {

  @Input() mine: boolean;

  images: Image[] = [];

  constructor(private readonly image: ImageService) { }

  ngOnInit() {
    (this.mine ? this.image.getMyImages() : this.image.getImages())
       .subscribe(res => this.images = res);
  }

}
