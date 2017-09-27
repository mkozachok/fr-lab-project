import { Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { ProductsListService } from '../services/products-list.service';
import { PosterComponent } from './poster/poster.component';
import { SmoothScrollToDirective, SmoothScrollDirective } from "ng2-smooth-scroll";
import { Observable, Subscription } from 'rxjs'
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Product } from '../models/product-model';
import { PRODUCT_TYPE_FILTER, PRODUCT_CATEGORY_FILTER } from './filter';
import { DesignService } from '../services/design.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as _ from 'lodash';
import { OrderService } from '../order-page/order-page.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [ProductsListService, OrderService, DesignService]
})

export class HomepageComponent implements OnInit {
  prods: FirebaseListObservable<any>;
  @Input() filtered: Product[];
  @Output() click = new EventEmitter();
  productsCategory: any[] = PRODUCT_CATEGORY_FILTER;
  procuctsType: any[] =  PRODUCT_TYPE_FILTER;
  public selected: string = '';
  categories: FirebaseListObservable<any>;
  templateTypes: FirebaseListObservable<any>;
  @Input() product;
  deleteButton: boolean;

  constructor(private productListService: ProductsListService, private db: AngularFireDatabase, private designService: DesignService, private orderService:OrderService, public snackBar: MdSnackBar, private router: Router, private userService: UserService) { 
  };

  ngOnInit():void {
    this.designService.getDesignCategory().subscribe(res => {this.categories = res});
    this.productListService.getTemplateTypes().subscribe(res => {this.templateTypes = res});
    this.productListService.getProducts().subscribe(items => {this.prods = items});
   };

   sorting(propValue) {
    this.productListService.selectProducts(propValue).subscribe(res=> {
      this.prods = res;
    });
  }

  navChanged (child: string){
    this.selected = child
  } 

  search(search) {   
    //this.productListService.search(search).subscribe(res => {this.prods = res});
    console.log(this.prods);
  }

  addToCart(product):void {
    this.orderService.addItem(product);
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
