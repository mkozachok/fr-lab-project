import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  error: any;
  constructor(private _userService: UserService, private router: Router) {
  }
  ngOnInit() {
  }

  onSubmit(value: any) {
    this.error = null;
    this._userService.logIn(value.email, value.password)
      .then((success) => this.router.navigate(['']))
      .catch(err => this.error = err);
  }
  onSubmitGoogle(value: any) {
    this.error = null;
    this._userService.loginInGoogle()
      // .then((success) => this.router.navigate(['additional-info']))
      .catch(err => this.error = err);
  }
}
