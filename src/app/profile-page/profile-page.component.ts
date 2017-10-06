import { Component, OnInit } from '@angular/core';
import { UserService, AdminService } from '.././services';
import { User } from '../models/user-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  public showSpinner = true;
  user = {};
  ProfilePageSubscription: Subscription = new Subscription();
  isAdmin: boolean;
  constructor(
    private _userService: UserService,
    private _adminService: AdminService
  ) {

  }

  getUser(){
    this.ProfilePageSubscription.add(this._userService.getUser().subscribe(res => {
      this.showSpinner = false;
      return this.user = res
    }));
    
  }

  ngOnInit() {
    this.ProfilePageSubscription.add(this._userService.getUserIdAsync().subscribe(user => {
      let id = user ? user.uid : 'Please login';
      this.ProfilePageSubscription.add(this._adminService.getAdmin(id).subscribe(admin => {
        if (admin.length > 0) {
          this.isAdmin = true;
        }
      }))
      this.getUser()
    }))


  }

  ngOnDestroy(){
    this.ProfilePageSubscription.unsubscribe();
  }


}
