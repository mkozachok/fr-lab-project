import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RedactorPageComponent } from './redactor-page/redactor-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RedactorPageComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
