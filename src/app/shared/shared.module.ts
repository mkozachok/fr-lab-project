import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../components/loader/loader.component';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { ViewOneProductComponent } from '../homepage/view-one-product/view-one-product.component';
import { MaterialModule } from '@angular/material';
import * as firebase from 'firebase';
import { UploadService } from '../services/upload.service';
import { CommonModule } from '@angular/common';
import { OrderedProductComponent } from '../profile-page/my-orders/ordered-product/ordered-product.component';

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
    OrderedProductComponent
  ],
  exports: [
    LoaderComponent,
    FileUploadComponent,
    ViewOneProductComponent,
    OrderedProductComponent
  ],
  providers: [UploadService]
})
export class SharedModule { }
