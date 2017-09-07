import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RedactorPageComponent } from './redactor-page/redactor-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RedactorPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
