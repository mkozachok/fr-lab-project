import { RouterModule } from '@angular/router';
import { ProfilePageRoutingModule, profilePageRoutingComponents } from './profile-page.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule } from '@angular/material';
import { MdInputModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { MdSnackBarModule } from '@angular/material';
import { MdGridListModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    profilePageRoutingComponents
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfilePageRoutingModule,
    MdButtonModule,
    MdInputModule,
    MdTabsModule,
    MdSnackBarModule,
    MdGridListModule,
    
  ]
})
export class ProfilePageModule { }