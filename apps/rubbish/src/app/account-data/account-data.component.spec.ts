import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AccountDataComponent } from "./account-data.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AUTH_SERVICE_STUB_PROVIDER } from "../auth/auth.service.stub";
import { MaterialModule } from "../material/material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("AccountDataComponent", () => {
  let component: AccountDataComponent;
  let fixture: ComponentFixture<AccountDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientTestingModule, NoopAnimationsModule],
      declarations: [AccountDataComponent],
      providers: [AUTH_SERVICE_STUB_PROVIDER],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
