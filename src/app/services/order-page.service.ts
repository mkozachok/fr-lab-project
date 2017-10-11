import { Injectable } from '@angular/core';
import { Order } from '../models/order-model';
import { Product } from '../models/product-model';

let quantity = 0;
let amount = 0;
let ORDERS = [];

@Injectable()
export class OrderService {

	getAll(): Order[] {
		return ORDERS;
	}

	setAll(orders) {
		ORDERS = orders.slice();
		quantity = ORDERS.length;
	}

	getItemIndex(item): number {
		return ORDERS.indexOf(item);
	}

	getQuantity(): number {
		if (JSON.parse(localStorage.getItem("cart-items")) !== null) {
			quantity = 0;
			JSON.parse(localStorage.getItem("cart-items")).forEach(el => {
				quantity += el.quantity;
			});
		}
		return quantity;
	}

	getTotalAmount(): number {
		amount = 0;
		ORDERS.forEach(el => {
			amount += el.quantity * el.product.price;
		});
		return amount;
	}

	removeAll(): void {
		ORDERS.length = 0;
		quantity = 0;
		amount = 0;
		localStorage.setItem("cart-items", JSON.stringify(this.getAll()));
	}

	removeItem(item): void {
		let index = this.getItemIndex(item);
		quantity -= ORDERS[index].quantity;
		ORDERS.splice(index, 1);
		localStorage.setItem("cart-items", JSON.stringify(this.getAll()));
	}

	incrementItemQuantity(item) {
		let index = this.getItemIndex(item);
		ORDERS[index].quantity++;
		quantity++;
	}

	decrementItemQuantity(item) {
		let index = this.getItemIndex(item);
		if (ORDERS[index].quantity > 1) {
			ORDERS[index].quantity--;
			quantity--;
		}
	}

	addItem(item: Product, itemKey: string, itemQuantity: number): void {
		if (JSON.parse(localStorage.getItem("cart-items")) !== null) {				
			this.setAll(JSON.parse(localStorage.getItem("cart-items")));
		}
		let exists = false;
		ORDERS.forEach(el => {
			if (el.productKey === itemKey && (el.product.size === item.size) && (itemKey !== 'no')) {
				el.quantity++;
				quantity++;
				exists = true;
			}
		});
		if (!exists) {
			let newItem = new Order(item, itemQuantity, itemKey);
			ORDERS.push(newItem);
			quantity++;
		}
		localStorage.setItem("cart-items", JSON.stringify(this.getAll()));
	}

	checkifExists(item) {
			ORDERS.forEach(el => {
				if ((this.getItemIndex(item) !== this.getItemIndex(el))) {
					if (el.productKey === item.productKey && (el.product.size === item.product.size) && (item.productKey !== 'no')) {
						el.quantity += item.quantity;
						quantity += item.quantity;
						this.removeItem(item);
					}
				}
			});
	}
}