import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order-model';
import { OrderService } from './order-page.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService]
})

export class OrderPageComponent implements OnInit {
	orders: Order[];
	orderHeaders: string[] = ['', 'Size', 'Quantity', 'Priсe', ''];
	constructor(private orderService: OrderService, private router: Router) { }


	getOrders(): void {
		this.orderService.getOrders().then(orders => this.orders = orders);
	}

	ngOnInit() {
		this.getOrders();
	}

	addButtonClick(order) {
		++order.quantity;
	}

	subtractButtonClick(order) {
		if (order.quantity > 1) {
			--order.quantity;
		}
	}

	removeItem(order) {
		let elToRemove = document.getElementById(order.id);
		document.getElementsByClassName('items')[0].removeChild(elToRemove);
	}

	navigate() {
    	this.router.navigate(['/order-page/make-order']);
  	}
}