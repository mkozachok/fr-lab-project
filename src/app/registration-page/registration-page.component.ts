import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Upload } from '../models/upload-model';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  error: any;
  selectedFiles: FileList;
  currentUpload: Upload;
  downloadedPhoto: boolean = false;
  addPhoto = "add_a_photo";

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(value: any) {
    this.error = null;
    this._userService.registerUser(value.email, value.password )
      .then((succes) => this.upload(value))
      .then((succes) => this._userService.createUserAdditionalInformation(value.phone, value.address))
      .then((success) => this.router.navigate(['']))
      .catch(err => this.error = err);
  }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
      this.downloadedPhoto = true;
  }

  upload(value: any) {
    let file = this.selectedFiles.item(0);
    this.currentUpload = new Upload(file);
    this._userService.createPrimaryInformation(this.currentUpload, value.name, value.surname);
  }


}
