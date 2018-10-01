import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteImageGridComponent } from './delete-image-grid.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DeleteImageGridComponent', () => {
  let component: DeleteImageGridComponent;
  let fixture: ComponentFixture<DeleteImageGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteImageGridComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteImageGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
