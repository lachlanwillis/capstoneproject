import { 
  Component, 
  Input, 
  ViewChild, 
  HostListener, 
  OnChanges, 
  ElementRef, 
  AfterViewInit, 
  OnInit
} from '@angular/core';

import { Detection } from './image';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() src: string;
  @Input() dets: Detection[];

  @ViewChild('overlay') private overlay: ElementRef;
  @ViewChild('image') private image: ElementRef;
  @ViewChild('container') private container: ElementRef;

  private multiplier = 1;

  constructor() { }

  ngOnInit() {
    this.drawBoxes();
  }

  ngAfterViewInit() {
    this.drawBoxes();
  }

  ngOnChanges() {
    this.drawBoxes();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.drawBoxes();
  }

  private drawBoxes() {
    let container = this.container.nativeElement as HTMLDivElement;
    let canvas = this.overlay.nativeElement as HTMLCanvasElement;
    let image = this.image.nativeElement as HTMLImageElement;

    canvas.height = container.clientHeight * this.multiplier;
    canvas.width = container.clientWidth * this.multiplier;

    let height = canvas.height,
        width = canvas.width,
        imageWidth = image.naturalWidth,
        imageHeight = image.naturalHeight;

    let widthRatio = width / imageWidth,
        heightRatio = height / imageHeight;

    let ctx = canvas.getContext('2d');

    if (this.dets) {
      this.dets.forEach(det => {
        let x = (det.box.x - (det.box.w / 2)) * widthRatio,
            y = (det.box.y - (det.box.h / 2)) * heightRatio,
            w = det.box.w * widthRatio,
            h = det.box.h * heightRatio;
        ctx.lineWidth = 5 * widthRatio;
        ctx.strokeRect(x, y, w, h);            
      });
    }
  }


}
