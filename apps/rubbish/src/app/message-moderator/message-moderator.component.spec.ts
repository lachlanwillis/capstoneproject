import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MessageModeratorComponent } from "./message-moderator.component";
import { MaterialModule } from "../material/material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AUTH_SERVICE_STUB_PROVIDER } from "../auth/auth.service.stub";
import { MESSAGES_SERVICE_STUB_PROVIDER } from "../messages/messages.service.stub";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("MessageModeratorComponent", () => {
  let component: MessageModeratorComponent;
  let fixture: ComponentFixture<MessageModeratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, HttpClientTestingModule, NoopAnimationsModule],
      providers: [AUTH_SERVICE_STUB_PROVIDER, MESSAGES_SERVICE_STUB_PROVIDER],
      declarations: [MessageModeratorComponent],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
