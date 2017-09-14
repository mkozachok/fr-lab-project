import { Component, OnInit } from '@angular/core';
import { UserService } from '.././services/user.service';
import { User } from '../models/user-model';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  //avatarSrc = '../../assets/images/avatars/myAvatar.png'
  user = {};

  constructor(
    private _userService: UserService,
    private afAuth: AngularFireAuth
  ) {
    this._userService.getUser().subscribe(res => this.user = res);
  }

  ngOnInit() {

  }


}
