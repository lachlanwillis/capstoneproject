import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';
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
import { AuthService } from './auth/auth.service';
import { BrowseImagesComponent } from './browse-images/browse-images.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Waterway Litter' } },
  { path: 'example', component: ExampleComponent },
  { path: 'userportal', component: UserportalComponent, data: { title: 'User Portal' } },
  { path: 'moderatorportal', component: ModeratorportalComponent, data: { title: 'Moderator Portal' } },
  { path: 'login', component: AuthComponent, data: { title: 'Login', hide: true } }
]


@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    HomeComponent,
    NavComponent,
    UserUploadComponent,
    FooterComponent,
    FooterComponent,
    ModeratorportalComponent,
    HeaderComponent,
    UserportalComponent,
    AuthComponent,
    BrowseImagesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
