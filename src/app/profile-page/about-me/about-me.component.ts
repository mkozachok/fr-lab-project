import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MdSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, OnDestroy  {
  userForm: FormGroup;
  user = {
    firstName: '',
    lastName: '',
    email: '',
    photoUrl: ''
  };
  subscribeToGetUser;
  constructor(private _userService: UserService, public snackBar: MdSnackBar, private afAuth: AngularFireAuth, private _formBuilder: FormBuilder) {
    let that = this;
    let test;
    this.subscribeToGetUser = this._userService.getUser().subscribe(res => {
      this.user.firstName = res.displayName.split(' ')[0];
      this.user.lastName = res.displayName.split(' ')[1];
      this.user.email = res.email;
      this.user.photoUrl = res.photoURL;
    });
  }

  ngOnInit() {
     this.userForm = this._formBuilder.group({
      firstName: ['Enter new first name'],
      lastName: ['Enter new last name'],
      email: ['Enter new email'],
      photoUrl: ['Put here URL to new photo']
    })
  }

  ngOnDestroy(){
    this.subscribeToGetUser.unsubscribe();
  }

  onSubmit(){
    let name = `${this.userForm.value.firstName} ${this.userForm.value.lastName}`;
    let photo = this.userForm.value.photoUrl;
    let email = this.userForm.value.email;
    this._userService.updateUser(name, photo, email);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message = "Changes are saved", action = "success", {
      duration: 2000,
    });
  }


}
