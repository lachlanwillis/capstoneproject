import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
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
  @ViewChild('updateImage') update: TemplateRef<any>;
  @ViewChild('imageDetailView') detail: TemplateRef<any>;

  images: Image[] = [];

  selectedImage?: Image;

  constructor(
    private readonly image: ImageService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
    (this.mine ? this.image.getMyImages() : this.image.getImages())
       .subscribe(res => this.images = res);
  }

  deleteMyImage(image: Image): void {
    this.dialog.open(this.modal)
      .afterClosed()
      .subscribe(result => {
        if (!!result && this.mine === true) {
          this.image.deleteMyImage(image._id)
            .subscribe(() => this.ngOnInit());
        }
      });
  }

  imageClick(image: Image): void {
    this.selectedImage = image;
    this.dialog.open(this.detail)
      .afterClosed()
      .subscribe(() => {});
  }

  editMyImage(image: Image): void {
    this.selectedImage = Object.assign({}, image);
    this.dialog.open(this.update)
      .afterClosed()
      .subscribe(result => {
        if (result === true) {
          this.updateImage();
        }
      });
  }

  updateImage(): void {
    this.image.updateMyImage(this.selectedImage._id, {
      title: this.selectedImage.title,
      description: this.selectedImage.description
    }).subscribe(() => {
      this.selectedImage = undefined;
      this.ngOnInit()
    });
  }

}
