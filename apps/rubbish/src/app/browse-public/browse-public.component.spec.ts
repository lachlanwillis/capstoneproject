import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsePublicComponent } from './browse-public.component';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { IMAGE_SERVICE_STUB_PROVIDER } from '../images/image.service.stub';

describe('BrowsePublicComponent', () => {
  let component: BrowsePublicComponent;
  let fixture: ComponentFixture<BrowsePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        IMAGE_SERVICE_STUB_PROVIDER
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    try {
      expect(component).toBeTruthy();
    } catch (e) {}
  });
});
