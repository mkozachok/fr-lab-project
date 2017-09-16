import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user-model';
import { AngularFireAuth } from 'angularfire2/auth';

import { OrderService } from '../order-page.service';
import { MakeOrderService } from '../../services/make-order.service';

import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css'],
  providers: [MakeOrderService, OrderService]
})
export class MakeOrderComponent implements OnInit {

	autorised = false;
	autorisedUser = {};

	constructor(private userService: UserService, private afAuth: AngularFireAuth, 
		private makeOrderService: MakeOrderService, private orderService: OrderService,
		public dialog: MdDialog, private router: Router) {
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
		this.openDialog();
		this.orderService.removeAll();
	}

	openDialog() {
		let dialogRef = this.dialog.open(DialogComponent, {
			width: '30%',
			data: 'Your order has been accepted. Thank you for using our services!'
		});
		dialogRef.afterClosed().subscribe(result => {
			this.router.navigate(['']);
   		});
	}
}
