import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';

import { User } from '../../models/user-model';
import { AngularFireAuth } from 'angularfire2/auth';

import { OrderService } from '../../services/order-page.service';
import { MakeOrderService } from '../../services/make-order.service';
import { UserService } from '../../services/user.service';

import { DialogComponent } from '../../components/dialog/dialog.component';

import { Subscription } from "rxjs";

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.scss'],
  providers: [MakeOrderService, OrderService]
})
export class MakeOrderComponent implements OnInit {
	autorised: boolean;
	user = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: ''
	}
	userSubscribe: Subscription;
  	additionalUserInfoSubscribe: Subscription;
  	public showSpinner = true;

	constructor(private userService: UserService, private afAuth: AngularFireAuth,
		private makeOrderService: MakeOrderService, private orderService: OrderService,
		public dialog: MdDialog, private router: Router) {
			if (JSON.parse(localStorage.getItem("cart-items")) !== null) {				
				this.orderService.setAll(JSON.parse(localStorage.getItem("cart-items")));
			}
	}

	ngOnInit() {
		this.userSubscribe = this.userService.getUser().subscribe(res => {
			this.autorised = res ? true : false;
			if (!this.autorised) {
				this.showSpinner = false;
			} else {
				this.user.firstName = res.displayName.split(' ')[0];
				this.user.lastName = res.displayName.split(' ')[1],
				this.user.email = res.email;

				this.additionalUserInfoSubscribe = this.userService.getUserFromDataBase(this.userService.getUserId()).subscribe(res => {
					this.showSpinner = false;
					this.user.phone = res.additionalInfo.phone;
					this.user.address = res.additionalInfo.address;
				});
			}
		});
	}

	onSubmit(data: any) {
		this.showSpinner = true;
		let userId = !this.autorised ? '0' : this.userService.getUserId();
		this.makeOrderService.setOrder(userId, this.orderService.getAll(), data, this.orderService.getTotalAmount()).then(resolve => {
			this.openDialog();
			this.orderService.removeAll();
		});
	}

	openDialog() {
		this.showSpinner = false;
		let dialogRef = this.dialog.open(DialogComponent, {
			data: 'Your order has been accepted. Thank you for using our services!'
		});
		this.showSpinner = true;
		dialogRef.afterClosed().subscribe(result => {
			this.router.navigate(['']);
			this.showSpinner = false;
   		});
	}

	ngOnDestroy(): void {
		if (this.autorised) {
			this.userSubscribe.unsubscribe();
	    	this.additionalUserInfoSubscribe.unsubscribe();
		}
  	}
}
