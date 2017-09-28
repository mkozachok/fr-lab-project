import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product-model';
import { ProductsListService } from '../../services/products-list.service';
import { OrderService } from '../../services/order-page.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-view-one-product',
  templateUrl: './view-one-product.component.html',
  styleUrls: ['./view-one-product.component.scss']
})
export class ViewOneProductComponent implements OnInit {
  @Input() product;
  @Output() click = new EventEmitter();
  selectedItems: Product[];
  deleteButton: boolean;

  constructor(private productListService: ProductsListService, private orderService: OrderService, public snackBar: MdSnackBar, private router: Router, private userService: UserService) { 
  };

  ngOnInit():void {
    this.deleteButton = (this.router.url === '/profile-page/my-gallery');
    console.log(this);
  };

  addToCart(item) {
    this.orderService.addItem(item, item.$key);
    let config = new MdSnackBarConfig();
    config.extraClasses = ['success-snackbar'];
    config.duration = 1300;
    this.snackBar.open('This product has been added to your shoping cart', '', config);
  }

  delete() {
    this.userService.getUsersGallery(this.userService.getUserId()).subscribe(res => {
      this.userService.deleteProductFromGallery(this.product.$key, this.userService.getUserId(), res);
    });
  }
}
