import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app.routing.module';
import { NgModule } from '@angular/core';

import { ProfilePageModule } from './profile-page/profile-page.module';
//import { ProfilePageRoutingModule, profilePageRoutingComponents } from './profile-page/profile-page.routing.module'

import { AppComponent } from './app.component';
//import { ProfilePageComponent } from './profile-page/profile-page.component'


@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfilePageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
