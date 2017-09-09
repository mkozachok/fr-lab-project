import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logoSrc = "/assets/images/logo.png";
  basketIcon = "shopping_cart";
  ordersAmount = 3;
  constructor() { }

  ngOnInit() {
  }

}
