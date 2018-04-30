import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorportalComponent } from './moderatorportal.component';

describe('ModeratorportalComponent', () => {
  let component: ModeratorportalComponent;
  let fixture: ComponentFixture<ModeratorportalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorportalComponent ]
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
