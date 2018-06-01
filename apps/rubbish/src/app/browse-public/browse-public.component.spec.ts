import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsePublicComponent } from './browse-public.component';

describe('BrowsePublicComponent', () => {
  let component: BrowsePublicComponent;
  let fixture: ComponentFixture<BrowsePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowsePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowsePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
