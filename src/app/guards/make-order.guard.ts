import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { OrderService } from '../services/order-page.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';

@Injectable()
export class OrderGuard implements CanActivate {


  constructor(
    private _router: Router,
    private orderService: OrderService
  ) {

  }

  canActivate(): Observable<boolean> | boolean {
    if (this.orderService.getQuantity()) {
          return true;
        } else {
          this._router.navigate(['/']);
        }
  }
}