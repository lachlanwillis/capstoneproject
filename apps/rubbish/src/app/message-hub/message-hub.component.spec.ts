import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageHubComponent } from './message-hub.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MESSAGES_SERVICE_STUB_PROVIDER } from '../messages/messages.service.stub';

describe('MessageHubComponent', () => {
  let component: MessageHubComponent;
  let fixture: ComponentFixture<MessageHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule ],
      declarations: [ MessageHubComponent ],
      providers: [ MESSAGES_SERVICE_STUB_PROVIDER ],
      schemas: [ NO_ERRORS_SCHEMA ]
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
