import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Upload } from '../../models/upload-model';
import { UploadService } from '../../services/upload.service';

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
  photoUrl: string;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  // @Output() uploadEvent = new EventEmitter();
  constructor(private _uploadService: UploadService) {
    // this.uploadEvent = () => {
    //
    // }
  }

  ngOnInit() {
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length === 0) {
      this.downloadedPhoto = false;
    } else {
      this.downloadedPhoto = true;
    }
    console.log(this.downloadedPhoto)
  }

  upload() {
    let counter: number = 0;
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this._uploadService.pushUpload(this.currentUpload, 'productsPhoto');
    let timer = setInterval(() => {
      counter++;
      this.photoUrl = this._uploadService.getUrl();
      if (this.photoUrl) {
        this.notify.emit(this.photoUrl)
        clearInterval(timer);
      }else if(counter > 30) {
        clearInterval(timer);
        throw new Error('Timeout')
      }
    }, 500)
  }


}
