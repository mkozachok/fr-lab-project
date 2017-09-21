import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
// import { UploadService } from '../services/upload.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

// import { FileUploadComponent } from '../components/file-upload/file-upload.component';
// import { Upload } from '../models/upload-model';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  error: any;
  selectedFiles: FileList;
  // currentUpload: Upload;
  constructor(private _userService: UserService, private router: Router) {
  }
  ngOnInit() {
  }

  onSubmit(value: any) {
    this.error = null;
    this._userService.logIn(value.email, value.password)
      .then((success) => this.router.navigate(['']))
      .catch(err => this.error = err);
  }
  // upload(value: any) {
  //   let file = this.selectedFiles.item(0);
  //   this.currentUpload = new Upload(file);
  //   this._uploadService.pushUpload(this.currentUpload);
  // }
}
