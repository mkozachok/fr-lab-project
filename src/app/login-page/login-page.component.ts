import { Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {
  error: Error;
  userValue: boolean;
  constructor(private _userService: UserService, private router: Router, private _elementRef: ElementRef) {
  }
  ngOnInit() {
  }



  onSubmit(value: any) {
    this.error = null;
    this._userService.logIn(value.email, value.password)
      .then((success) => this.router.navigate(['/']))
      .catch(err => this.error = err);
  }
  onSubmitGoogle() {
    this.error = null;
    this._userService.loginInGoogle()
      .then((success) => this.router.navigate(['/']))
      .catch(err => this.error = err);
  }
  onSubmitFacebook() {
    this.error = null;
    this._userService.loginInFacebook()
    .then((success) => this.router.navigate(['/']))
    .catch(err => this.error = err);

  }
  googleAutorizationCheck() {
  const check =  this._userService.getUserFromDataBase(this._userService.getUserId())
    .subscribe(res => this.userValue = res.$exists());
    check.unsubscribe();
  }
  googeAutarizationRouting() {
    if (!this.userValue) {
      this._userService.createUserAdditionalInformation('', '')
      .then((success) => this.router.navigate(['/']));
    } else {
      this.router.navigate(['/']);
    }
  }
}
