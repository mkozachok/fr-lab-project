import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HomepageComponent } from './homepage.component';
import { PosterComponent } from './poster/poster.component'
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
 
@NgModule({
  imports: [BrowserModule, Ng2FilterPipeModule],
  declarations: [HomepageComponent],
  bootstrap: [HomepageComponent]
})
export class HomepageModule {}