import { RouterModule } from '@angular/router';
import { ProfilePageRoutingModule, profilePageRoutingComponents } from './profile-page.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { ProfilePageComponent } from './profile-page.component';


@NgModule({
  declarations: [
    profilePageRoutingComponents
  ],
  imports: [
    CommonModule,
    ProfilePageRoutingModule
  ]
})
export class ProfilePageModule { }