import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  user: Observable<firebase.User>;
  error: any;
  constructor(private _userService: UserService, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    this._userService.logIn(value.email, value.password)
      .catch(err => this.error = err);
  }

}
