import { Component, OnInit } from '@angular/core';
import { Upload } from '../../models/upload-model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  selectedFiles: FileList;
  currentUpload: Upload;
  downloadedPhoto: boolean = false;
  addPhoto = "insert_photo";
  constructor() { }

  ngOnInit() {
  }
  detectFiles(event) {
      this.selectedFiles = event.target.files;
      this.downloadedPhoto = true;
  }



}
