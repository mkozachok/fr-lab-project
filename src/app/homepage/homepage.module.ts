import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';
import { HomepageComponent } from './homepage.component';
import { HomepagePosterComponent } from './homepagePoster/homepagePoster.component';


@NgModule({
  declarations: [
    HomepageComponent, 
    HomepagePosterComponent
  ],
  imports: [
    CommonModule,
    MdButtonModule
  ]
})
export class ProfilePageModule { }