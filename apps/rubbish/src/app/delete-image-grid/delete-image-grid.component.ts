import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from '../image/image';

@Component({
  selector: 'app-delete-image-grid',
  templateUrl: './delete-image-grid.component.html',
  styleUrls: ['./delete-image-grid.component.scss']
})
export class DeleteImageGridComponent {

  @Input()
  images = [];

  @Output()
  delete = new EventEmitter<Image>();


}
