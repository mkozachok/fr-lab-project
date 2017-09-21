import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../../models/product-model'
import { ProductsListService } from '../../services/products-list.service';
import { PRODUCT_TYPE_FILTER, PRODUCT_CATEGORY_FILTER } from '../filter';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  providers: [ProductsListService]
})

export class FiltersComponent implements OnInit {
  @Input()
  @Output() click = new EventEmitter();
  productsCategory: any[] = PRODUCT_CATEGORY_FILTER;
  procuctsType: any[] =  PRODUCT_TYPE_FILTER;
  selected :any;
  @Input() products: FirebaseListObservable<any>;
  @Input() selectedItems: FirebaseListObservable<any>;
  @Input() productsArray;
  @Input() selectedItemsArray;

  constructor(private productListService: ProductsListService) { 
  };

  ngOnInit():void {
   };

  sorting(prop, propValue) {
    this.selectedItemsArray = this.productListService.selectProducts(prop, propValue);
    console.log(this.selectedItemsArray);
  }
}