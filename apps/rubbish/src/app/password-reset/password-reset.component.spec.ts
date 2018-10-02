import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PasswordResetComponent } from "./password-reset.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AUTH_SERVICE_STUB_PROVIDER } from "../auth/auth.service.stub";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("PasswordResetComponent", () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        NoopAnimationsModule
      ],
      declarations: [PasswordResetComponent],
      providers: [ AUTH_SERVICE_STUB_PROVIDER ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
