import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { BrowseImagesComponent } from './browse-images/browse-images.component';
import { ImageService } from './images/image.service';
import { ImageComponent } from './image/image.component';
import { BrowsePublicComponent } from './browse-public/browse-public.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MessageHubComponent } from './message-hub/message-hub.component';
import { AccountDataComponent } from './account-data/account-data.component';
import { VerifyComponent } from './verify/verify.component';
import { VerifiedComponent } from './verified/verified.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { MessageModeratorComponent } from './message-moderator/message-moderator.component';
import { AccountStatsComponent } from './account-stats/account-stats.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Waterway Litter', home: true } },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'reset/:token', component: PasswordResetComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'verified', component: VerifiedComponent },
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
  { path: 'message-test', component: MessageHubComponent },
  { path: 'login', component: AuthComponent, data: { title: 'Login/Signup', hide: true } },
  {
    path: 'leaderboard',
    component: LeaderboardComponent,
    data: { title: 'Leaderboard' }
  }
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
    BrowsePublicComponent,
    MessageHubComponent,
    AccountDataComponent,
    VerifyComponent,
    VerifiedComponent,
    LeaderboardComponent,
    ForgotPasswordComponent,
    PasswordResetComponent,
    MessageModeratorComponent,
    AccountStatsComponent
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
    MatSelectModule,
    MatCheckboxModule
    
    
  ],
  providers: [
    AuthService,
    ImageService,
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
