import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AlertComponent } from './_components/alert/alert.component';
import { PreviewComponent } from './post/preview/preview.component';
import { HomeComponent } from './home/home.component';

const imports = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule
];

const declararions = [
  AppComponent,
  AlertComponent,
  LoginComponent,
  DashboardComponent,
  HomeComponent,
  PreviewComponent
];

const providers = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
]

@NgModule({
  imports: imports,
  declarations: declararions,
  providers: providers,
  bootstrap: [AppComponent]
})
export class AppModule { }
