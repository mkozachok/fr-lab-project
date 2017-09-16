import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user-model';
import { AngularFireAuth } from 'angularfire2/auth';

import { OrderService } from '../order-page.service';
import { MakeOrderService } from '../../services/make-order.service';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css'],
  providers: [MakeOrderService, OrderService]
})
export class MakeOrderComponent implements OnInit {

	autorised = false;
	autorisedUser = {};

	constructor(private userService: UserService, private afAuth: AngularFireAuth, private makeOrderService: MakeOrderService, private orderService: OrderService) {
		this.userService.getUser().subscribe(res => {
			if (res) {
				this.autorised = true;
				this.autorisedUser = this.userService.getCurrentUser();
				console.log(this.autorisedUser);
			}
		});
	}

	ngOnInit() {

	}

	onSubmit(data: any) {
		if (!this.autorised) {
			this.makeOrderService.setOrder("0", this.orderService.getAll(), data);
		} else {
			this.makeOrderService.setOrder(this.userService.getUserId(), this.orderService.getAll(), {});
		}
	}
}
