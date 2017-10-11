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
  logoSrc = "./assets/images/colibriLogo.png";
  basketIcon = "shopping_cart";
  user = {};
  ordersAmount: number;
  fetchedData: boolean;
  subscription: Subscription = new Subscription();
  constructor(private _userService: UserService, private orderService: OrderService) {
   
    this.ordersAmount = this.orderService.getQuantity();
  }

  ngAfterContentChecked() {
    this.ordersAmount = this.orderService.getQuantity();
  }

  ngOnInit() {
    this.subscription.add(this._userService.getUser().subscribe(res =>{
      this.fetchedData = true;
      this.user = res;
    }));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  logOut() {
    this._userService.logOut();
    this.orderService.removeAll();
  }
}
