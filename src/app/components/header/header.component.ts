import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logoSrc = "/assets/images/logo.png";
  basketIcon = "shopping_cart";
  user = {};
  ordersAmount = 3;
  constructor(private _userService: UserService) {
    this._userService.getUser().subscribe(res => this.user = res)
   }

  ngOnInit() {
  }

  logOut(){
    this._userService.onLogOut();
  }
}
