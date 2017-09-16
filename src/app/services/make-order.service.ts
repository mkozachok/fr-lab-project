import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Order } from '../models/order-model';

@Injectable()
export class MakeOrderService {
	orders: FirebaseListObservable<any>;
	order: Order;

	constructor(private db: AngularFireDatabase) {
		this.orders = db.list('/orders');
	}

	setOrder(userid: string, order: Order[], user: any) {
		return this.orders.push({ userId:userid, orders: order, userInfo: user }).then(res=>console.log(res));
	}
}
