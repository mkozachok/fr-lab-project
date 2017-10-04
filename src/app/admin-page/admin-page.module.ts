import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminService } from '../services/admin.service';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { adminPageRoutingComponents, AdminPageRoutingModule, } from './admin-page-routing.module';
import {
  AddAdminComponent,
  AddProductComponent,
  AddDesignComponent,
} from './add-menu';

import {
  NewOrdersComponent,
  OrderComponent,
} from './new-orders';

import {
  RemoveMenuComponent,
  RemoveAdminComponent,
  RemoveProductComponent,
  RemoveDesignComponent,
  ProductComponent,
  AdminComponent,
  DesignComponent,
  EditProductComponent
} from './remove-menu';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AdminPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    adminPageRoutingComponents,
    AddAdminComponent,
    AddProductComponent,
    AddDesignComponent,
    RemoveMenuComponent,
    RemoveAdminComponent,
    RemoveProductComponent,
    RemoveDesignComponent,
    ProductComponent,
    AdminComponent,
    DesignComponent,
    NewOrdersComponent,
    OrderComponent,
    EditProductComponent
  ],
  entryComponents: [EditProductComponent],
  providers: [AdminService]
})
export class AdminPageModule { }
