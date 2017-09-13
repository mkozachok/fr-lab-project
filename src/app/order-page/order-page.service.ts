import { Injectable } from '@angular/core';
import { Order } from '../models/order-model';
import { ORDERS } from './orders';

let quantity = 0;
let amount = 0;

@Injectable()
export class OrderService {

	getAll(): Promise<Order[]> {
		return Promise.resolve(ORDERS);
	}

	getItemIndex(item): number {
		return ORDERS.indexOf(item);
	}

	getQuantity(): number {
		quantity = ORDERS.length;
		return quantity;
	}

	getTotalAmount(): number {
		amount = 0;
		ORDERS.forEach(el => {
			amount += el.quantity * el.price;
		});
		return amount;
	}

	removeAll(): void {
		ORDERS.length = 0;
		quantity = 0;
		amount = 0;
	}

	removeItem(item): void {
		let index = this.getItemIndex(item);
		ORDERS.splice(index, 1);
	}

	incrementItemQuantity(item) {
		let index = this.getItemIndex(item);
		ORDERS[index].quantity++;
	}

	decrementItemQuantity(item) {
		let index = this.getItemIndex(item);
		if (ORDERS[index].quantity > 1) {
			ORDERS[index].quantity--;
		}
	}
}