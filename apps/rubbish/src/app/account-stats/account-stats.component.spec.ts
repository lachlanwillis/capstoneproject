import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AccountStatsComponent } from "./account-stats.component";
import { AUTH_SERVICE_STUB_PROVIDER } from "../auth/auth.service.stub";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { IMAGE_SERVICE_STUB_PROVIDER } from "../images/image.service.stub";

describe("AccountStatsComponent", () => {
  let component: AccountStatsComponent;
  let fixture: ComponentFixture<AccountStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountStatsComponent],
      providers: [IMAGE_SERVICE_STUB_PROVIDER, AUTH_SERVICE_STUB_PROVIDER],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
