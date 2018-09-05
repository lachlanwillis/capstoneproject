import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageModeratorComponent } from './message-moderator.component';

describe('MessageModeratorComponent', () => {
  let component: MessageModeratorComponent;
  let fixture: ComponentFixture<MessageModeratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageModeratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
