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
		console.log(totalSum);
		return this.orders.push({ userId: userid, orders: order, userInfo: user, date: currentDate, totalSum: totalSum, new: true });
	}

	getAll() {
		return this.orders;
	}

	getUsersOrder(userId: string, allOrders: FirebaseListObservable<any>) {
		let items = allOrders.map(i => { return i });
		return items.filter(el => el.userId == userId);
	}

	updateOrder() {
		return this.db.list('/orders')
	}

	searachOrder(phrase, arrayOfOrders){
		let transformedPhrase = phrase.toLowerCase();
		return arrayOfOrders.filter(x => {
		  return x['userInfo']['address'].toLowerCase().indexOf(transformedPhrase) >= 0 ||
		  x['userInfo']['email'].toLowerCase().indexOf(transformedPhrase) >= 0 ||
		  x['userInfo']['firstName'].toLowerCase().indexOf(transformedPhrase) >= 0 ||
		  x['userInfo']['lastName'].toLowerCase().indexOf(transformedPhrase) >= 0 ||
		  x['userInfo']['phoneNumber'].toLowerCase().indexOf(transformedPhrase) >= 0;
		});
	}
}
