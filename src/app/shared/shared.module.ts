import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ViewOneProductComponent } from '../homepage/view-one-product/view-one-product.component';
import { MaterialModule } from '@angular/material';
import { UploadService } from '../services';
import { CommonModule } from '@angular/common';
import { OrderedProductComponent } from '../profile-page/my-orders';
import {
  FileUploadComponent,
  LoaderComponent,
  EmptyContentComponent
} from '../components';


@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  declarations: [
    LoaderComponent,
    FileUploadComponent,
    ViewOneProductComponent,
    OrderedProductComponent,
    EmptyContentComponent
  ],
  exports: [
    LoaderComponent,
    FileUploadComponent,
    ViewOneProductComponent,
    OrderedProductComponent,
    EmptyContentComponent
  ],
  providers: [UploadService],
  entryComponents: [
  ]
})
export class SharedModule { }
