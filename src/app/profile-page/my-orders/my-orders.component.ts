import { Component, OnInit } from '@angular/core';
import { MdExpansionModule } from '@angular/material';
import { MakeOrderService, UserService } from '../../services';
import { Subscription } from "rxjs";
import { Observable } from 'rxjs/Observable';
import { OrderedProductComponent } from './ordered-product';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
	iconEmpty:string = 'description';
  messageEmpty:string = `You haven't made any orders yet`;
	usersOrders: Observable<Array<any>>;
  showLoader = true;

	constructor(private makeOrderService: MakeOrderService, private userService: UserService) { }

	ngOnInit() {
  		this.makeOrderService.getAll().subscribe(res => {
        this.showLoader = false;
				this.usersOrders = this.makeOrderService.getUsersOrder(this.userService.getUserId(), res.reverse());
  		});
	}
}
