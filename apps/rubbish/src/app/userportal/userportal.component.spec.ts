import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { UserportalComponent } from "./userportal.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("UserportalComponent", () => {
  let component: UserportalComponent;
  let fixture: ComponentFixture<UserportalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, NoopAnimationsModule ],
      declarations: [ UserportalComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
