import { NgModule } from '@angular/core';
import { LoaderComponent } from '../components/loader/loader.component';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { MaterialModule } from '@angular/material';
import * as firebase from 'firebase';


@NgModule({
  imports: [
    MaterialModule
  ],
  declarations: [LoaderComponent, FileUploadComponent],
  exports: [LoaderComponent, FileUploadComponent]
})
export class SharedModule { }
