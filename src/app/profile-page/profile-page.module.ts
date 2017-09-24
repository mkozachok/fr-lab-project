import { RouterModule } from '@angular/router';
import { ProfilePageRoutingModule, profilePageRoutingComponents } from './profile-page.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

import { MyGalleryComponent } from './my-gallery/my-gallery.component';
import { ViewOneProductComponent } from '../homepage/view-one-product/view-one-product.component';

@NgModule({
  declarations: [
    profilePageRoutingComponents,
    MyGalleryComponent,
    ViewOneProductComponent
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