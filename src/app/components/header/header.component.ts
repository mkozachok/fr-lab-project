import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../order-page/order-page.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [OrderService]
})
export class HeaderComponent implements OnInit {
  logoSrc = "/assets/images/logo.png";
  basketIcon = "shopping_cart";
  user = {};
  ordersAmount: number;
  constructor(private _userService: UserService, private orderService: OrderService) {
    this._userService.getUser().subscribe(res => this.user = res);
    this.ordersAmount = this.orderService.getQuantity();
   }

   ngAfterContentChecked() {
    this.ordersAmount = this.orderService.getQuantity();
  }

  ngOnInit() {

  }

  logOut(){
    this._userService.onLogOut();
  }
}
