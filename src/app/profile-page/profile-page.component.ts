import { Component, OnInit } from '@angular/core';
import { UserService } from '.././services/user.service';
import { User } from '../models/user-model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  user = {};
  
  constructor(private _userService: UserService, bd: AngularFireDatabase) { 
       
  }

  ngOnInit() {

  }


}
