import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../../models/product-model';
import { ViewOneProductComponent } from '../view-one-product/view-one-product.component';
import { ProductsListService } from '../../services/products-list.service';
import { OrderService } from '../../order-page/order-page.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.scss'],
  providers: [ProductsListService, OrderService]
})

export class ViewAllProductsComponent implements OnInit {
  @Input()
  @Output() click = new EventEmitter();
  
  @Input() prods: FirebaseListObservable<any>;

  constructor(private productListService: ProductsListService, private orderService: OrderService, public snackBar: MdSnackBar) {
  };
  
  addToCart(product):void {
    this.orderService.addItem(product);
    let config = new MdSnackBarConfig();
    config.extraClasses = ['success-snackbar'];
    config.duration = 1300;
    this.snackBar.open('This product has been added to your shoping cart', '', config);
  }

  getAll() {
    this.productListService.getAll().subscribe((res=> {
      this.prods = res;
      console.log(this.prods);
    }));
  }

  ngOnInit() {
    this.getAll();
  };
}
