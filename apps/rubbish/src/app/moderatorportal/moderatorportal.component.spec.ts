import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorportalComponent } from './moderatorportal.component';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';
import { IMAGE_SERVICE_STUB_PROVIDER } from '../images/image.service.stub';

describe('ModeratorportalComponent', () => {
  let component: ModeratorportalComponent;
  let fixture: ComponentFixture<ModeratorportalComponent>;

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
    fixture = TestBed.createComponent(ModeratorportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
