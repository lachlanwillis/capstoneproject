import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUploadComponent } from './user-upload.component';
import { AppModule } from '../app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('UserUploadComponent', () => {
  let component: UserUploadComponent;
  let fixture: ComponentFixture<UserUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
