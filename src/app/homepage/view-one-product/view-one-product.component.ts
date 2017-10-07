import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product-model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import { EditProductComponent } from '../../admin-page/remove-menu';
import {
  MdSnackBar,
  MdSnackBarConfig,
  MdDialog
} from '@angular/material';

import {
  UserService,
  AdminService,
  OrderService,
  ProductsListService
} from '../../services';


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
  templateTypes: FirebaseListObservable<any>;
  isAdmin: boolean;
  viewOneProductSubscription: Subscription = new Subscription()

  constructor(
    private productListService: ProductsListService,
    private orderService: OrderService,
    public snackBar: MdSnackBar,
    private router: Router,
    private userService: UserService,
    private adminService: AdminService,
    public dialog: MdDialog,
  ) {
  };

  ngOnInit(): void {
    this.viewOneProductSubscription.add(this.userService.getUserIdAsync().subscribe(user => {
      let id = user ? user.uid : 'Please login';
      this.viewOneProductSubscription.add(this.adminService.getAdmin(id).subscribe(admin => {
        if (admin.length > 0 && this.router.routerState.snapshot.url==='/') {
          this.isAdmin = true;
        }
      }))
    }))
    this.deleteButton = (this.router.url === '/profile-page/my-gallery');
    this.productListService.getTemplateTypes().subscribe(res => {
      this.templateTypes = res;
    });
  };

  addToCart(product) {
    if (!product.size) {
      let config = new MdSnackBarConfig();
      config.extraClasses = ['success-snackbar'];
      config.duration = 1300;
      this.snackBar.open('Please, choose a size', 'required', config);
    } else {
      this.orderService.addItem(product, product.$key, 1);
      localStorage.setItem("cart-items", JSON.stringify(this.orderService.getAll()));
      let config = new MdSnackBarConfig();
      config.extraClasses = ['success-snackbar'];
      config.duration = 1300;
      this.snackBar.open('This product has been added to the cart', 'sucess', config);
    }
  }

  setSize(size, product): void {
    product.size = size;
  }

  delete() {
    this.userService.getUsersGallery(this.userService.getUserId()).subscribe(res => {
      this.userService.deleteProductFromGallery(this.product.$key, this.userService.getUserId(), res);
    });
  }

  onEdit({ $key, name, category, owner, price, type }) {
    let dialogRef = this.dialog.open(EditProductComponent, {
      data: {
        $key: $key,
        name: name,
        category: category,
        owner: owner,
        price: price,
        type: type
      }
    });
  }
}
