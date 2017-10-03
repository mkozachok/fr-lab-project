import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MdSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { environment } from '../../../environments/environment';
import { Subscription } from "rxjs";
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})

export class AboutMeComponent implements OnInit, OnDestroy {
  ReferenceToAvatars: string = 'avatars';
  showLoader = true;
  userForm: FormGroup;
  waitForDelivery: boolean;
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
  id: string;
  name: string;
  photo: string;
  email: string;
  phone: string;
  address: string;

  subscribeToGetUser: Subscription;
  subscribeToGetUserFromDataBase: Subscription;
  constructor(
    private _userService: UserService,
    public snackBar: MdSnackBar,
    private _commonService: CommonService,
    private _formBuilder: FormBuilder
  ) {  

    }

  ngOnInit(): Subscription {
    this.userForm = this._formBuilder.group({
      firstName: [
        null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[A-Z][a-z]{1,19}$')
        ]
      ],
      lastName: [
        null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[A-Z][a-z]{1,19}$')
        ]
      ],
      phone: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15),
          Validators.pattern('^[0-9\+]{1,}$')
        ]
      ],
      address: [
        null,
        [
          Validators.required
        ]
      ]
    })

    return this.subscribeToGetUser = this._userService.getUser()
      .subscribe(res => {
        this.user = {
          firstName: res.displayName.split(' ')[0],
          lastName: res.displayName.split(' ')[1],
          email: res.email,
          photoUrl: res.photoURL,
          id: res.uid
        }



        this.subscribeToGetUserFromDataBase = this._userService
          .getUserFromDataBase(this.user.id)
          .subscribe(res => {
            this.showLoader = false;
            this.userAdditionalInfo = {
              address: res.additionalInfo.address,
              phone: res.additionalInfo.phone
            };
          })
      });
  }

  ngOnDestroy(): void {
    this.subscribeToGetUser.unsubscribe();
    this.subscribeToGetUserFromDataBase.unsubscribe();
  }

  onSubmit(): void {
    this.waitForDelivery = true;
    this.id = this.user.id;
    this.name = `${this.userForm.value.firstName} ${this.userForm.value.lastName}`;
    this.email = this.userForm.value.email;
    this.phone = this.userForm.value.phone;
    this.address = this.userForm.value.address;
  }



  onNotify(url) {
    if (this.user.photoUrl.includes('firebasestorage.googleapis.com/v0/b/kolibri-7dd6a')) {
      this._userService.deleteUserOldAvatar(this.user.photoUrl);
    }

    console.log(url)
    this._userService.updateUser(this.id, this.name, url, this.phone, this.address).then(resolve => {
      this._commonService.openSnackBar('User has been saved', 'success');
    }).catch(error => {
      this._commonService.openSnackBar(error.name, 'error');
      console.log(error)
    }).then(() => this.waitForDelivery = false);
  }


}
