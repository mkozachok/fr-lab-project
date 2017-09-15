import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { AuthGuard } from './auth.guard';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AdminGuard implements CanActivate {
  adminsArr = [
    '6uLaXQMblATpeeq3Ol2BZh4klA82'
  ];

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _authGuard: AuthGuard,
    private _afAuth: AngularFireAuth
  ) {

  }

  canActivate(): Observable<boolean> | boolean {
    let access: boolean;

    if (this._userService.isUserLogIn()) {
      access = this.adminsArr.some(id => {
        return id === this._userService.getUserId();
      });

      if (!access) {
        this._router.navigate(['/'])
      }
      return access;
    } else {
      this._router.navigate(['/login-page']);
      return false
    }




  }
}