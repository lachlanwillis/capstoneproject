import { 
  Component, 
  Input, 
  ViewChild, 
  HostListener, 
  OnChanges, 
  ElementRef, 
  AfterViewInit, 
  OnInit,
  OnDestroy,
  Output
} from '@angular/core';

import { Detection } from './image';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';

@Component({
  selector: 'image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {

  @Input() src: string;
  @Input() dets: Detection[];

  @Output() get tags(): string[] {
    return this.dets.map(det => det.name);
  }

  @ViewChild('overlay') private overlay: ElementRef;
  @ViewChild('image') private image: ElementRef;

  private multiplier = 1;
  private timeoutSub = new Subscription();

  constructor() { }

  ngOnInit() {
    this.drawBoxes();
    this.timeoutSub = Observable.timer(100).subscribe(() => this.drawBoxes());
  }

  ngAfterViewInit() {
    this.drawBoxes();
  }

  ngOnChanges() {
    this.drawBoxes();
  }

  ngOnDestroy() {
    this.timeoutSub.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.drawBoxes();
  }

  private drawBoxes() {
    let canvas = this.overlay.nativeElement as HTMLCanvasElement;
    let image = this.image.nativeElement as HTMLImageElement;

    canvas.height = image.clientHeight * this.multiplier;
    canvas.width = image.clientWidth * this.multiplier;

    canvas.style.height = `${image.clientHeight}px`;
    canvas.style.width = `${image.clientWidth}px`;

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
        ctx.strokeRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));            
      });
    }
  }


}
