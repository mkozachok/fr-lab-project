import { RouterModule } from '@angular/router';
import { ProfilePageRoutingModule, profilePageRoutingComponents } from './profile-page.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
// import { SubOrderComponent } from './new-orders/order/sub-order/sub-order.component';



@NgModule({
  declarations: [
    profilePageRoutingComponents,
    // MyGalleryComponent
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