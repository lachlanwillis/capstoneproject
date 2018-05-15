import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseImagesComponent } from './browse-images.component';

describe('BrowseImagesComponent', () => {
  let component: BrowseImagesComponent;
  let fixture: ComponentFixture<BrowseImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseImagesComponent ]
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
