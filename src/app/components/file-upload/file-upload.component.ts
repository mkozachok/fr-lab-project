import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Upload } from '../../models/upload-model';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})


export class FileUploadComponent implements OnInit {
  selectedFiles: FileList;
  currentUpload: Upload;
  downloadedPhoto: boolean = false;
  addPhoto: string = "insert_photo";
  photoUrl: string;
  @Input() saveUrl: string;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _uploadService: UploadService) { }

  ngOnInit() {

  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    if (this.selectedFiles.length) {
      this.downloadedPhoto = true;
    }
  }


  upload() {
    if (this.selectedFiles) {
      let counter: number = 0;
      let file = this.selectedFiles.item(0);
      this.currentUpload = new Upload(file);
      this._uploadService.pushUpload(this.currentUpload, this.saveUrl);
      let timer = setInterval(() => {
        counter++;
        this.photoUrl = this._uploadService.getUrl();
        if (this.photoUrl) {
          this.notify.emit(this.photoUrl)
          clearInterval(timer);
          this.downloadedPhoto = false;
        } else if (counter > 30) {
          clearInterval(timer);
          throw new Error('Timeout')
        }
      }, 500)
    }else{
      this.notify.emit(undefined);
    }
  }


}