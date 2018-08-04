import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseImagesComponent } from './browse-images.component';
import { AppTestingModule } from '../app.module.testing';
import { APP_BASE_HREF } from '@angular/common';

describe('BrowseImagesComponent', () => {
  let component: BrowseImagesComponent;
  let fixture: ComponentFixture<BrowseImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppTestingModule ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
