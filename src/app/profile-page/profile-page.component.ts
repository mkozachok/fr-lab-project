import { Component, OnInit } from '@angular/core';
import { UserService } from '.././services/user.service'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user = {};
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this.user = this._userService.getUser();
    
  }

}
