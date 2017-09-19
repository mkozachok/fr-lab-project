import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { adminPageRoutingComponents } from './admin-page-routing.module'
import { MaterialModule } from '@angular/material';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AddAdminComponent } from './add-menu/add-admin/add-admin.component';
import { AddProductComponent } from './add-menu/add-product/add-product.component';
import { AddDesignComponent } from './add-menu/add-design/add-design.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RemoveMenuComponent } from './remove-menu/remove-menu.component';
import { RemoveAdminComponent } from './remove-menu/remove-admin/remove-admin.component';
import { RemoveProductComponent } from './remove-menu/remove-product/remove-product.component';
import { RemoveDesignComponent } from './remove-menu/remove-design/remove-design.component';
import { SharedModule } from '../shared/shared.module';
import { AdminService } from '../services/admin.service';
import { SearchFilterPipe } from '../pipes/searchingFileterPipe';

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
    SearchFilterPipe
  ],
  providers: [AdminService]
})
export class AdminPageModule { }
