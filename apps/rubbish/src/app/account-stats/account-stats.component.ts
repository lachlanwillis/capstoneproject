import { Component, OnInit, Input, Output } from '@angular/core';
import { ImageService } from '../images/image.service';
import { Image } from '../image/image';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-account-stats',
  templateUrl: './account-stats.component.html',
  styleUrls: ['./account-stats.component.scss']
})
export class AccountStatsComponent implements OnInit {

  images: Image[] = [];
  user?: any;
  totalImages: number;
  totalDetections: number;
  currentRank: number;
 

  constructor(
    private readonly image: ImageService,
    private readonly auth: AuthService
  ) {}

  ngOnInit() {
    (this.image.getMyImages())
       .subscribe(res => {
         this.images = res;
         this.totalImages = res.length;
         this.totalDetections = this.images.reduce((acc, image) => (acc + image.detections.length), 0);
      });

    this.auth.getCurrentUser()
      .subscribe(user => {
        this.user = user;

        if (this.user.points < 10) {
          this.currentRank = 1
        } else {
          this.currentRank = Math.floor(Math.pow(parseFloat(this.user.points) / 10.0, 0.5)) + 1;
        }
      });

    
    
  }

}
