import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MdSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  user = {
    firstName: '',
    lastName: '',
    email: '',
    photoUrl: ''
  };
  subscribeToGetUser;
  constructor(
    private _userService: UserService,
    public snackBar: MdSnackBar,
    private afAuth: AngularFireAuth,
    private _formBuilder: FormBuilder
  ) {
    let that = this;
    let test;
    this.subscribeToGetUser = this._userService.getUser().subscribe(res => {
      this.user.firstName = res.displayName.split(' ')[0];
      this.user.lastName = res.displayName.split(' ')[1];
      this.user.email = res.email;
      this.user.photoUrl = res.photoURL;
    });
  }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      firstName: ['Enter new first name'],
      lastName: ['Enter new last name'],
      //email: ['Enter new email'],
      photoUrl: ['Put here URL to new photo'],
      //password: []
    })
  }

  ngOnDestroy(): void {
    this.subscribeToGetUser.unsubscribe();
  }

  onSubmit(): void {
    let name = `${this.userForm.value.firstName} ${this.userForm.value.lastName}`;
    let photo = this.userForm.value.photoUrl;
    let email = this.userForm.value.email;
    //let password = this.userForm.value.password;
    this._userService.updateUser(name, photo, /*email  password */).then(resolve=>{
      this.openSnackBar('User has been saved', 'success');
    }).catch(error=>{
      this.openSnackBar(error.name,'error');
    });
  }


  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
