import { Component, OnInit } from '@angular/core';
import {MdExpansionModule} from '@angular/material';
import { MakeOrderService } from '../../services/make-order.service';
import { UserService } from '../../services/user.service';
import { Subscription } from "rxjs";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  providers: [MakeOrderService]
})
export class MyOrdersComponent implements OnInit {
	usersOrders: Observable<Array<any>>;
  showLoader = true;

	constructor(private makeOrderService: MakeOrderService, private userService: UserService) { }

	ngOnInit() {
  		this.makeOrderService.getAll().subscribe(res => {
        this.showLoader = false;
  			this.usersOrders = this.makeOrderService.getUsersOrder(this.userService.getUserId(), res);
  		});
	}
}
