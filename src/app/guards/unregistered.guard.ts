import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MdDialog } from '@angular/material';
import { UserService } from '../services';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { LogOutMessageComponent } from '../components'

@Injectable()
export class UnregisteredGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService,
    public dialog: MdDialog
  ) { }

  canActivate(): Observable<boolean> | boolean {
    return this.userService.getUser()
      .take(1)
      .map(authState => !!!authState)
      .do(auth => {
        if (auth) {
          return true;
        } else {
          this.router.navigate([''])
            .then(res => {
              let dialogRef = this.dialog.open(LogOutMessageComponent)
            })
        }
      });
  }

}
