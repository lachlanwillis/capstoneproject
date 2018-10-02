import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaggedGridComponent } from './flagged-grid.component';
import { IMAGE_SERVICE_STUB_PROVIDER } from '../images/image.service.stub';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FlaggedGridComponent', () => {
  let component: FlaggedGridComponent;
  let fixture: ComponentFixture<FlaggedGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlaggedGridComponent ],
      providers: [ IMAGE_SERVICE_STUB_PROVIDER ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlaggedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
