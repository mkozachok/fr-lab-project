import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { AuthGuard } from './auth.guard';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AdminGuard implements CanActivate {


  constructor(
    private _router: Router,
    private _userService: UserService,
    private _adminService: AdminService,
    private _afAuth: AngularFireAuth
  ) {

  }

  canActivate(): Observable<boolean> | boolean {
    let access: boolean;
    let id: string;

    if (this._userService.isUserLogIn()) {
      id = this._userService.isUserLogIn().uid;
      return this._adminService.getAdmin(id).map(res => {
        if (res[0]) {
          return true;
        } else {
          this._router.navigate(['/']);
        }
      })
    }else{  
      this._router.navigate(['/login-page']);
    }

  }

  canActivateChild(): Observable<boolean> | boolean {
    return this.canActivate();
}
}