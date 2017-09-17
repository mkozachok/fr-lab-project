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
	autorised: boolean;
	user = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: ''
	}

	constructor(private userService: UserService, private afAuth: AngularFireAuth, 
		private makeOrderService: MakeOrderService, private orderService: OrderService,
		public dialog: MdDialog, private router: Router) {
		this.userService.getUser().subscribe(res => {
			this.autorised = res ? true : false;
			if (this.autorised) {
				this.getLoggedUserData();
			}
		});
	}

	ngOnInit() {
		// this.getLoggedUserData();
	}

	onSubmit(data: any) {
		let userId = !this.autorised ? '0' : this.userService.getUserId();
		this.makeOrderService.setOrder(userId, this.orderService.getAll(), data);
		this.openDialog();
	}

	getLoggedUserData() {
		let fullNameString = this.userService.isUserLogIn().displayName;
		let fullNameArray = fullNameString.split(' ');
		this.user.firstName = fullNameArray[0];
		this.user.lastName = fullNameArray[1];
		this.user.email = this.userService.isUserLogIn().email;
	}

	openDialog() {
		let dialogRef = this.dialog.open(DialogComponent, {
			width: '30%',
			data: 'Your order has been accepted. Thank you for using our services!'
		});
		dialogRef.afterClosed().subscribe(result => {
			this.router.navigate(['']);
			this.orderService.removeAll();
   		});
	}
}