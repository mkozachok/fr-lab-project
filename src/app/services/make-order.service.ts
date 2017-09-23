import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Order } from '../models/order-model';
import * as firebase from 'firebase';

@Injectable()
export class MakeOrderService {
	orders: FirebaseListObservable<any>;
	order: Order;

	constructor(private db: AngularFireDatabase) {
		this.orders = db.list('/orders');
	}

	setOrder(userid: string, order: Order[], user: any, totalSum: number): firebase.Promise<void> {
		let currentDate = firebase.database.ServerValue.TIMESTAMP;
		return this.orders.push({ userId:userid, orders: order, userInfo: user, date: currentDate, totalSum: totalSum });
	}

	getAll() {
		return this.orders;
	}

	getUsersOrder(userId: string, allOrders: FirebaseListObservable<any> ) {
		let items = allOrders.map(i => {return i});
		return items.filter(el => el.userId == userId);
	}
}
