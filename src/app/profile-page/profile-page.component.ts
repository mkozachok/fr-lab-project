import { Component, OnInit } from '@angular/core';
import { ProfilePageService } from './profile-page.service'

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user = {};
  constructor(private _profilePageService: ProfilePageService) { }

  ngOnInit() {
    this.user = this._profilePageService.getUser();

  }

}
