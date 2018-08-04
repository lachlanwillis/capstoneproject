import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { UserUploadComponent } from './user-upload/user-upload.component';
import { FooterComponent } from './footer/footer.component';
import { ModeratorportalComponent } from './moderatorportal/moderatorportal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { UserportalComponent } from './userportal/userportal.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { BrowseImagesComponent } from './browse-images/browse-images.component';
import { ImageService } from './images/image.service';
import { ImageComponent } from './image/image.component';
import { BrowsePublicComponent } from './browse-public/browse-public.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AUTH_SERVICE_STUB_PROVIDER } from './auth/auth.service.stub';
import { IMAGE_SERVICE_STUB_PROVIDER } from './images/image.service.stub';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Waterway Litter', home: true } },
  {
    path: 'userportal',
    component: UserportalComponent,
    data: { title: 'User Portal' },
    canActivate: [ AuthGuard ]
  },
  {
    path: 'moderatorportal',
    component: ModeratorportalComponent,
    data: { title: 'Moderator Portal' },
    canActivate: [ AdminGuard ]
  },
  {
    path: 'browse-public',
    component: BrowsePublicComponent,
    data: { title: 'Browse Waterways' }
  },
  { path: 'login', component: AuthComponent, data: { title: 'Login/Signup', hide: true } }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    UserUploadComponent,
    FooterComponent,
    FooterComponent,
    ModeratorportalComponent,
    HeaderComponent,
    UserportalComponent,
    AuthComponent,
    BrowseImagesComponent,
    ImageComponent,
    BrowsePublicComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
  ],
  providers: [
    AUTH_SERVICE_STUB_PROVIDER,
    IMAGE_SERVICE_STUB_PROVIDER,
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppTestingModule { }
