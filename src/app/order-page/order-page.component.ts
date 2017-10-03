import { Component, OnInit, OnChanges } from '@angular/core';
import { Order } from '../models/order-model';
import { OrderService } from '../services/order-page.service';
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
	totalAmount: number;
	totalQuantity: number;
	basketIcon = "shopping_cart";

	constructor(private orderService: OrderService, private router: Router) { }

	ngOnInit() {
		this.orders = this.orderService.getAll();
		console.log(this.orders);
		this.totalQuantity = this.orderService.getQuantity();
		this.totalAmount = this.orderService.getTotalAmount();
	}

	ngAfterContentChecked() {
		this.totalQuantity = this.orderService.getQuantity();
		this.totalAmount = this.orderService.getTotalAmount();
	}

	addButtonClick(item) {
		this.orderService.incrementItemQuantity(item);
	}

	subtractButtonClick(item) {
		this.orderService.decrementItemQuantity(item);
	}

	navigate() {
    	this.router.navigate(['make-order']);
  	}

	getOrders(): void {
		this.orderService.getAll();
	}

	empty(): void {
		this.orderService.removeAll();
	}

	removeOrder(item) {
		this.orderService.removeItem(item);
	}

}