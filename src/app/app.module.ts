import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app.routing.module';
import { NgModule } from '@angular/core';

import { MdToolbarModule } from '@angular/material';
import { MdIconModule } from '@angular/material';

import { ProfilePageModule } from './profile-page/profile-page.module';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component'



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfilePageModule,
    MdToolbarModule,
    MdIconModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
