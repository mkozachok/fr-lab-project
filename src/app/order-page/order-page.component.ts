import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order-model';
import { OrderService } from './order-page.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})

export class OrderPageComponent implements OnInit {
	orders: Order[];
	constructor(private orderService: OrderService) { }

	getOrders(): void {
		this.orderService.getOrders().then(orders => this.orders = orders);
	}

	ngOnInit() {
		this.getOrders();
	}
}