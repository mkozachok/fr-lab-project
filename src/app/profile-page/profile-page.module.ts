import { RouterModule } from '@angular/router';
import { ProfilePageRoutingModule, profilePageRoutingComponents } from './profile-page.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';
import { MdInputModule } from '@angular/material';

@NgModule({
  declarations: [
    profilePageRoutingComponents
  ],
  imports: [
    CommonModule,
    ProfilePageRoutingModule,
    MdButtonModule,
    MdInputModule
  ]
})
export class ProfilePageModule { }