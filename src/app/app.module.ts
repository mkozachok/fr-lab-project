import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app.routing.module';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

// App modules goes here
import { ProfilePageModule } from './profile-page/profile-page.module';

// App components goes here
import { HomepageComponent } from './homepage/homepage.component';
import { RedactorPageComponent } from './redactor-page/redactor-page.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'

// Materials modules goes here
import { MdCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule } from '@angular/material';
import { MdIconModule } from '@angular/material';
import { MdGridListModule } from '@angular/material';
import { MdSidenavModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdListModule } from '@angular/material';
import { MdExpansionModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { MdInputModule } from '@angular/material';

// Services goes here
import { UserService } from './services/user.service';


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
    MdInputModule,
    MdButtonModule,
    MdExpansionModule,
    MdTabsModule,
    BrowserAnimationsModule,
    MdCardModule,
    MdListModule,
    HttpModule
  ],
  providers: [UserService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
