import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlaggedGridComponent } from './flagged-grid.component';

describe('FlaggedGridComponent', () => {
  let component: FlaggedGridComponent;
  let fixture: ComponentFixture<FlaggedGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlaggedGridComponent ]
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
