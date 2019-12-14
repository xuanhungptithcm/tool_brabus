import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {NgbModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
const config: SocketIoConfig = { 
  url: 'https://brabus.io:8443', options: {
    query: 'token=4282e03370de48d67878bfd467913edf.3274aa403b758344f38c7cef3d2d79ea&account=D100596&authen=0ba8a81d3384b179a49ff72b0c2e32c25e6a42a9c68fb773930e06a047010566&EIO'
  }
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbTabsetModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
