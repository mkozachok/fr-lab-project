import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MdSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { environment } from '../../../environments/environment';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  user = {
    firstName: "",
    lastName: "",
    email: "",
    photoUrl: "",
    id: ""
  };
  userAdditionalInfo = {
    address: "",
    phone: ""
  };

  subscribeToGetUser: Subscription;
  subscribeToGetUserFromDataBase: Subscription;
  constructor(
    private _userService: UserService,
    public snackBar: MdSnackBar,
    private afAuth: AngularFireAuth,
    private _formBuilder: FormBuilder
  ) {
    let that = this;
    let test;
    this.subscribeToGetUser = this._userService.getUser()
      .subscribe(res => {
        this.user = {
          firstName: res.displayName.split(' ')[0],
          lastName: res.displayName.split(' ')[1],
          email: res.email,
          photoUrl: res.photoURL,
          id: res.uid
        }



        this.subscribeToGetUserFromDataBase = this._userService.getUserFromDataBase(this.user.id).subscribe(res => {
          this.userAdditionalInfo = {
            address: res.additionalInfo.address,
            phone: res.additionalInfo.phone
          }
        })
      });
  }

  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      firstName: [null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[A-Z][a-z]{2,19}$')]],
      lastName: [null, [Validators.required, Validators.maxLength(10), Validators.pattern('^[A-Z][a-z]{2,19}$')]],
      photoUrl: [],
      phone: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern('^[0-9\+]{1,}$')]],
      address: [null, [Validators.required]]
    })
  }

  ngOnDestroy(): void {
    this.subscribeToGetUser.unsubscribe();
    this.subscribeToGetUserFromDataBase.unsubscribe();
  }

  onSubmit(): void {
    let id = this.user.id;
    let name = `${this.userForm.value.firstName} ${this.userForm.value.lastName}`;
    let photo = this.userForm.value.photoUrl;
    let email = this.userForm.value.email;
    let phone = this.userForm.value.phone;
    let address = this.userForm.value.address;
    this._userService.updateUser(id, name, photo, phone, address).then(resolve => {
      this.openSnackBar('User has been saved', 'success');
    }).catch(error => {
      this.openSnackBar(error.name, 'error');
    });
  }


  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
