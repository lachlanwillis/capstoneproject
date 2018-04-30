import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { UserUploadComponent } from './user-upload/user-upload.component';
import { FooterComponent } from './footer/footer.component';

import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'example', component: ExampleComponent },
  { path: 'uploader', component: UserUploadComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
    HomeComponent,
    NavComponent,
    UserUploadComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
