import { NgModule } from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { ViewOneProductComponent } from '../homepage/view-one-product/view-one-product.component';
import { MaterialModule } from '@angular/material';
import * as firebase from 'firebase';
import { UploadService } from '../services/upload.service';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    MaterialModule,
    CommonModule
  ],
  declarations: [LoaderComponent, FileUploadComponent, ViewOneProductComponent],
  exports: [LoaderComponent, FileUploadComponent, ViewOneProductComponent],
  providers: [UploadService]
})
export class SharedModule { }
