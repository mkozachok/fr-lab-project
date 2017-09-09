import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app.routing.module';
import { NgModule } from '@angular/core';

import { MdToolbarModule } from '@angular/material';
import { MdIconModule } from '@angular/material';

import { ProfilePageModule } from './profile-page/profile-page.module';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdGridListModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfilePageModule,
    MdToolbarModule,
    MdIconModule,
    BrowserAnimationsModule,
    MdGridListModule,
    MdInputModule,
    MdButtonModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
