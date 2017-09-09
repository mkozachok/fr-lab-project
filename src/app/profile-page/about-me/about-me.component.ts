import { Component, OnInit } from '@angular/core';
import { ProfilePageService } from '../profile-page.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  user = {};

  constructor(private _profilePageService: ProfilePageService) { }

  ngOnInit() {
    this.user = this._profilePageService.getUser();
  }
}