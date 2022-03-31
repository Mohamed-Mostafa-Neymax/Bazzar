import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from './components/home/home.component';
import { WrongRouteComponent } from './components/auth/errors/wrong-route/wrong-route.component';
import {ConnectionServiceModule} from 'ng-connection-service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddBannersComponent } from './components/banners/add-banners/add-banners.component';
import { EditBannersComponent } from './components/banners/edit-banners/edit-banners.component';
import { ListBannersComponent } from  './components/banners/list-banners/list-banners.component'
import { BannersModule } from './components/banners/banners.module';
import { VouchersModule } from './components/vouchers/vouchers.module';
 
@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    LoginComponent,
    HomeComponent,
    WrongRouteComponent,
    AddBannersComponent,
    EditBannersComponent,
    ListBannersComponent,
   
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ConnectionServiceModule,
    MatSnackBarModule,
    NgxDropzoneModule,
    BannersModule,
    VouchersModule,
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
