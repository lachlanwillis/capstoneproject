import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHubComponent } from './message-hub.component';

describe('MessageHubComponent', () => {
  let component: MessageHubComponent;
  let fixture: ComponentFixture<MessageHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageHubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
