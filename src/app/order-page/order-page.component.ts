import { Component, OnInit, OnChanges } from '@angular/core';
import { Order } from '../models/order-model';
import { OrderService } from '../services/order-page.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


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

	constructor(
		private orderService: OrderService,
		private router: Router,
		private iconRegistry: MdIconRegistry,
		private sanitizer: DomSanitizer
	) { 
		iconRegistry
			.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/ic_delete_black_36px.svg'));
			if (JSON.parse(localStorage.getItem("cart-items")) !== null) {				
				this.orderService.setAll(JSON.parse(localStorage.getItem("cart-items")));
			}
			localStorage.setItem("cart-items", JSON.stringify(this.orderService.getAll()));
			this.orders = this.orderService.getAll();
			this.totalQuantity = this.orderService.getQuantity();
			this.totalAmount = this.orderService.getTotalAmount();
	}

	ngOnInit() {
		
	}

	ngAfterContentChecked() {
		this.totalQuantity = this.orderService.getQuantity();
		this.totalAmount = this.orderService.getTotalAmount();
	}

	addButtonClick(item) {
		this.orderService.incrementItemQuantity(item);
		localStorage.setItem("cart-items", JSON.stringify(this.orderService.getAll()));
	}

	subtractButtonClick(item) {
		this.orderService.decrementItemQuantity(item);
		localStorage.setItem("cart-items", JSON.stringify(this.orderService.getAll()));
	}

	navigate() {
		this.router.navigate(['make-order']);
	}

	getOrders(): void {
		this.orderService.getAll();
	}

	empty(): void {
		this.orderService.removeAll();
		localStorage.setItem("cart-items", JSON.stringify(this.orderService.getAll()));
	}

	removeOrder(item) {
		this.orderService.removeItem(item);
		localStorage.setItem("cart-items", JSON.stringify(this.orderService.getAll()));
	}
}