import { Injectable } from '@angular/core';
import { Order } from '../models/order-model';
import { ORDERS } from './orders';


@Injectable()
export class OrderService {
	getOrders(): Promise<Order[]> {
		return Promise.resolve(ORDERS);
	}
}