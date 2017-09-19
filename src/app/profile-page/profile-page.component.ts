import { Component, OnInit } from '@angular/core';
import { UserService } from '.././services/user.service';
import { User } from '../models/user-model';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  public showSpinner = true;
  user = {};

  constructor(
    private _userService: UserService,
    private afAuth: AngularFireAuth
  ) {

  }

  ngOnInit():Subscription {
    return this._userService.getUser().subscribe(res => {
      this.showSpinner = false;
      return this.user = res
    });
  }


}
