import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BrowseImagesComponent } from "./browse-images.component";
import { APP_BASE_HREF } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { IMAGE_SERVICE_STUB_PROVIDER } from "../images/image.service.stub";
import { MaterialModule } from "../material/material.module";

describe("BrowseImagesComponent", () => {
  let component: BrowseImagesComponent;
  let fixture: ComponentFixture<BrowseImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule ],
      providers: [
        { provide: APP_BASE_HREF, useValue: "/" },
        IMAGE_SERVICE_STUB_PROVIDER
      ],
      declarations: [ BrowseImagesComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
