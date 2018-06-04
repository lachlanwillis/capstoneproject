import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserportalComponent } from './userportal.component';
import { APP_BASE_HREF } from '@angular/common';
import { AUTH_SERVICE_STUB_PROVIDER } from '../auth/auth.service.stub';
import { AppTestingModule } from '../app.module.testing';

describe('UserportalComponent', () => {
  let component: UserportalComponent;
  let fixture: ComponentFixture<UserportalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppTestingModule ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/'},
        AUTH_SERVICE_STUB_PROVIDER
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
