import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteImageGridComponent } from './delete-image-grid.component';

describe('DeleteImageGridComponent', () => {
  let component: DeleteImageGridComponent;
  let fixture: ComponentFixture<DeleteImageGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteImageGridComponent ]
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
