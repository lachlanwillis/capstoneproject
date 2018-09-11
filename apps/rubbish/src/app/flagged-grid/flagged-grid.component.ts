import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../image/image';
import { ImageService } from '../images/image.service';

@Component({
  selector: 'app-flagged-grid',
  templateUrl: './flagged-grid.component.html',
  styleUrls: ['./flagged-grid.component.scss']
})
export class FlaggedGridComponent {

  @Input()
  images: Image[] = [];

  @Output()
  update = new EventEmitter();

  constructor(
    private readonly image: ImageService
  ) { }

  onFlaggedDeleteClicked(image: Image) {
    this.image.deleteImage(image._id)
      .subscribe(() => this.update.emit());
  }

  onFlaggedAcceptClicked(image: Image) {
    this.image.acceptFlaggedImages(image._id)
      .subscribe(() => this.update.emit());
  }

}
