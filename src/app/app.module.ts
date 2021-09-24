import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common//http'
import { SharedModule } from './shared/shared.module';
import { AuthHttpInterceptor } from './auth/auth-http-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [
    // override the Denpendency Injection System
    {provide:HTTP_INTERCEPTORS,useClass:AuthHttpInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
