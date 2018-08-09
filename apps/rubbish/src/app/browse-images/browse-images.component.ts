import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { ImageService } from '../images/image.service';
import { Image } from '../image/image';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-browse-images',
  templateUrl: './browse-images.component.html',
  styleUrls: ['./browse-images.component.scss']
})
export class BrowseImagesComponent implements OnInit {
  page = 1;
  pageSize = 12;

  @Input() mine: boolean;
  @ViewChild('deleteImage') modal: TemplateRef<any>;

  images: Image[] = [];

  constructor(
    private readonly image: ImageService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
    (this.mine ? this.image.getMyImages() : this.image.getImages())
       .subscribe(res => this.images = res);
  }

  deleteMyImage(image: Image): void {

    console.log('image', image);

    this.dialog.open(this.modal)
      .afterClosed()
      .subscribe(result => {
        if (!!result && this.mine === true) {
          this.image.deleteMyImage(image._id)
            .subscribe(() => this.ngOnInit());
        }
      });
  }

}
