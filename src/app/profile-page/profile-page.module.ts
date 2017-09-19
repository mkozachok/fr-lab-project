import { RouterModule } from '@angular/router';
import { ProfilePageRoutingModule, profilePageRoutingComponents } from './profile-page.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    profilePageRoutingComponents,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfilePageRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class ProfilePageModule { }