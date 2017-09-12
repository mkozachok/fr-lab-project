import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app.routing.module';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgModel } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

import { MdCheckboxModule } from '@angular/material';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdGridListModule } from '@angular/material';
import { MdSidenavModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import {MdCardModule} from '@angular/material';


import {MdListModule} from '@angular/material';


import { MdExpansionModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { ProfilePageModule } from './profile-page/profile-page.module';
import { HomepageComponent } from './homepage/homepage.component';
import { RedactorPageComponent } from './redactor-page/redactor-page.component';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'

import { MdInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RedactorPageComponent,
    routingComponents,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    [MdButtonModule, MdCheckboxModule],
    AppRoutingModule,
    ProfilePageModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdIconModule,
    MdGridListModule,
    MdSidenavModule,
    MdButtonModule,

    MdCardModule,
    MdInputModule,

    MdExpansionModule,
    MdTabsModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdListModule,
    HttpModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
