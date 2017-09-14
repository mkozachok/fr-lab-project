import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../models/product-model'
import { ProductsListService } from '../services/products-list.service';
import { PRODUCT_TYPE_FILTER, PRODUCT_CATEGORY_FILTER } from './filter';
import { PosterComponent } from './poster/poster.component';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { OrderService } from '../order-page/order-page.service';

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
  products: Product[];
  selectedItems: Product[];
  userFilter: any = {name: '', type: '', category: ''};
  constructor(private productListService: ProductsListService, private orderService: OrderService) { };

  getAll():void {
    this.productListService.getAll().then(products => this.products = products);
    this.productListService.getAll().then(selectedItems => this.selectedItems = selectedItems);
  };

  ngOnInit():void {
    this.getAll();
   };

  sorting(prop, propValue, arr, originalArr: Product[]) {
    this.selectedItems = this.productListService.selectProducts(prop, propValue, arr, originalArr);
  }
  
  search(field, arr, originalArr:Product[]) {
    this.selectedItems = this.productListService.searchProduct(field, arr, originalArr);
  }

  addToCart(item) {
    this.productListService.getItem(item);
    this.orderService.addItem(item);
  }
}
