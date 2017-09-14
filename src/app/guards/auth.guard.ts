import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(): Observable<boolean> {
        return this.userService.authInfo()
            .take(1)
            .map(authState => !!authState)
            .do(auth => !auth ? this.router.navigate(['/login-page']) : true);
    }
}