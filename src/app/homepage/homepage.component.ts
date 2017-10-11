import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
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
import { OrderService } from '../services/order-page.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CurrencyPipe } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { SafeHtml } from '@angular/platform-browser';
import { MdMenuModule } from '@angular/material';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AdminService } from '../services/admin.service';
import { ViewOneProductComponent } from './view-one-product/view-one-product.component'
import * as firebase from 'firebase';

@Component({
  moduleId: module.id,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss', './homepage.component.media.scss'],
  providers: [ProductsListService, OrderService, DesignService]
})

export class HomepageComponent implements OnInit {
  public showSpinner = true;
  prods: Observable<Array<any>>;
  arrOfProds: Observable<Array<any>>;
  @Input() filtered: Product[];
  @Output() click = new EventEmitter();
  productsCategory: any[] = PRODUCT_CATEGORY_FILTER;
  procuctsType: any[] = PRODUCT_TYPE_FILTER;
  public selected: string = '';
  categories: FirebaseListObservable<any>;
  templateTypes: FirebaseListObservable<any>;
  @Input() product;
  deleteButton: boolean;
  startAt = new Subject()
  endAt = new Subject();
  homePageSubscription: Subscription = new Subscription();

  constructor(
    private productListService: ProductsListService,
    private db: AngularFireDatabase,
    private designService: DesignService,
    private orderService: OrderService,
    public snackBar: MdSnackBar,
    private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private adminService: AdminService
  ) {    
  };

  ngOnInit(): void {
    let tempArr;
    this.designService.getDesignCategory().subscribe(res => { this.categories = res });
    this.productListService.getTemplateTypes().subscribe(res => {
      this.templateTypes = res;
    });
    this.homePageSubscription.add(this.productListService.getProducts().subscribe(items => {
      this.showSpinner = false;
      tempArr = items.slice();
      tempArr.reverse();
      this.prods = tempArr;
      this.arrOfProds = this.prods;
    }));
  };


  ngOnDestroy(){
  }

  sorting(propValue) {
    this.productListService.selectProducts(propValue).subscribe(res => {
      this.prods = res.reverse();
    });
  }

  navChanged(child: string) {
    this.selected = child
  }

  search(search) {
    this.prods = this.arrOfProds;
    this.prods = this.productListService.search(search, this.prods);
  }

  addToCart(product): void {
    if (!product.size) {
      let config = new MdSnackBarConfig();
      config.extraClasses = ['success-snackbar'];
      config.duration = 1300;
      this.snackBar.open(`Please, choose a product size`, 'required', config);
    } else {
      this.orderService.addItem(product, product.$key, 1);
      let config = new MdSnackBarConfig();
      config.extraClasses = ['success-snackbar'];
      config.duration = 1300;
      this.snackBar.open('This product has been added to the cart', 'sucess', config);
    }
  }

  setSize(size, product): void {
    product.size = size;
  }
}
