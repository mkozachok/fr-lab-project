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
import { MdDialog } from '@angular/material';
import { EditProductComponent } from '../admin-page/remove-menu/remove-product/edit-product/edit-product.component';
import { AdminService } from '../services/admin.service';

@Component({
  moduleId: module.id,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss', './homepage.component.media.scss'],
  providers: [ProductsListService, OrderService, DesignService]
})

export class HomepageComponent implements OnInit {
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
  isAdmin: boolean;
  subscriptionToUserService: Subscription
  subscriptionToAdminService: Subscription

  constructor(
    private productListService: ProductsListService,
    private db: AngularFireDatabase,
    private designService: DesignService,
    private orderService: OrderService,
    public snackBar: MdSnackBar,
    private router: Router,
    private userService: UserService,
    private iconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer,
    public dialog: MdDialog,
    private adminService: AdminService
  ) {
    iconRegistry
      .addSvgIcon('mode_edit', sanitizer.bypassSecurityTrustResourceUrl('../../assets/icons/ic_mode_edit_black_24px.svg'))
  };

  ngOnInit(): void {
    let that = this;
    this.subscriptionToUserService = this.userService.getUserIdAsync().subscribe(user => {
      let id = user? user.uid : 'Please login';
     this.subscriptionToAdminService = this.adminService.getAdmin(id).subscribe(admin => {
        if(admin.length > 0){
          this.isAdmin = true;
        }
      })
    })
    this.designService.getDesignCategory().subscribe(res => { this.categories = res });
    this.productListService.getTemplateTypes().subscribe(res => {
      this.templateTypes = res;
    });
    this.productListService.getProducts().subscribe(items => {
      this.prods = items;
      this.arrOfProds = this.prods;
    });
    //this.productListService.getProducts2(this.startAt, this.endAt).subscribe(items => this.prods = items);
  };

  ngOnDestroy(){
    this.subscriptionToUserService.unsubscribe();
    this.subscriptionToAdminService.unsubscribe()
  }

  sorting(propValue) {
    this.productListService.selectProducts(propValue).subscribe(res => {
      this.prods = res;
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
      this.orderService.addItem(product, product.$key);
      localStorage.setItem("cart-items", JSON.stringify(this.orderService.getAll()));
      let config = new MdSnackBarConfig();
      config.extraClasses = ['success-snackbar'];
      config.duration = 1300;
      this.snackBar.open('This product has been added to the cart', 'sucess', config);
    }
  }

  setSize(size, product): void {
    console.log(size)
    product.size = size;
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
