import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../models/product-model'
import { ProductsListService } from '../services/products-list.service';
import { PRODUCT_TYPE_FILTER, PRODUCT_CATEGORY_FILTER } from './filter';
import { PosterComponent } from './poster/poster.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { OrderService } from '../order-page/order-page.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [ProductsListService, OrderService]
})

export class HomepageComponent implements OnInit {
  @Input()
  @Output() click = new EventEmitter();
  productsCategory: any[] = PRODUCT_CATEGORY_FILTER;
  procuctsType: any[] =  PRODUCT_TYPE_FILTER;
  selectedItems: Product[];
  userFilter: any = {name: '', type: '', category: ''};
  items: FirebaseListObservable<any[]>;

  constructor(private productListService: ProductsListService, private orderService: OrderService, private db: AngularFireDatabase) { 
  };

  getAll():void {
    this.productListService.getAll();
    /*this.productListService.getAll().then(selectedItems => this.selectedItems = selectedItems);*/
  };

  ngOnInit():void {
    this.getAll();
   };

  sorting(prop, propValue, arr, originalArr: Product[]) {
    this.selectedItems = this.productListService.selectProducts(prop, propValue, arr, originalArr);
  }
  
  search(arr:Product[], originalArr:Product[], searchTerm) {
    this.selectedItems = this.productListService.search(arr, originalArr, searchTerm);
  }

  addToCart(item) {
    this.productListService.getItem(item);
    this.orderService.addItem(item);
  }
}
