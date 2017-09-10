import { Component, OnInit } from '@angular/core';
import { ProfilePageService } from '../profile-page.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  user = {};

  constructor(private _profilePageService: ProfilePageService, public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.user = this._profilePageService.getUser();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message = "Changes are saved", action="success", {
      duration: 2000,
    });
  }
}