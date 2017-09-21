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

	getUsersOrder(userId: string) {
		let usersOrders= [];
		let items = this.orders.map(i=>{return i});
		items.forEach(i=>i.forEach(e=>{
			if (e.userId == userId) {
				usersOrders.push(e);
			}
		}));
		return usersOrders;
	}
}
