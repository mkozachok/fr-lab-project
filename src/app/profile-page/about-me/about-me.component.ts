import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  user = {};

  constructor(private _userService: UserService, public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.user = this._userService.getUser();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message = "Changes are saved", action="success", {
      duration: 2000,
    });
  }


}