import { Component, OnInit, Input, Output } from '@angular/core';
import { ImageService } from '../images/image.service';
import { Image } from '../image/image';

@Component({
  selector: 'app-account-stats',
  templateUrl: './account-stats.component.html',
  styleUrls: ['./account-stats.component.scss']
})
export class AccountStatsComponent implements OnInit {

  images: Image[] = [];
  totalImages: number;
  totalDetections: number;

  constructor(
    private readonly image: ImageService
  ) {}

  ngOnInit() {
    (this.image.getMyImages())
       .subscribe(res => {
         this.images = res;
         this.totalImages = res.length;
         this.totalDetections = this.images.reduce((acc, image) => (acc + image.detections.length), 0);
       });
  }

}
