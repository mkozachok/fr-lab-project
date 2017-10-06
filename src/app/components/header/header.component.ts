import { Component, OnInit } from '@angular/core';
import { UserService, OrderService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [OrderService]
})
export class HeaderComponent implements OnInit {
  logoSrc = "./assets/images/logo.png";
  basketIcon = "shopping_cart";
  user = {};
  ordersAmount: number;
  subscription: Subscription
  constructor(private _userService: UserService, private orderService: OrderService) {
   this.subscription = this._userService.getUser().subscribe(res => this.user = res);
    // console.log(JSON.parse(localStorage.getItem("cart-items")).length);
    // this.ordersAmount = JSON.parse(localStorage.getItem("cart-items")).length;
    this.ordersAmount = this.orderService.getQuantity();
    // localStorage.setItem("cart-items", JSON.stringify(this.orderService.getAll()));
  }

  ngAfterContentChecked() {
    this.ordersAmount = this.orderService.getQuantity();
    // this.ordersAmount = JSON.parse(localStorage.getItem("cart-items")).length;
  }

  ngOnInit() {
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  logOut() {
    this._userService.logOut();
    this.orderService.removeAll();
  }
}
