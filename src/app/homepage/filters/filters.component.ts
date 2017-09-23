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
  @Output() click = new EventEmitter();
  productsCategory: any[] = PRODUCT_CATEGORY_FILTER;
  procuctsType: any[] =  PRODUCT_TYPE_FILTER;
  @Input() prods: FirebaseListObservable<any>;
  public selected: string = '';

  constructor(private productListService: ProductsListService, private db: AngularFireDatabase) { 
  };

  ngOnInit():void {
  };

  sorting(prop, propValue) {
    this.productListService.selectProducts(prop, propValue).subscribe((res=> { 
      this.prods = res;
    }));
    console.log(this.prods)
  }

  navChanged (child: string){
    this.selected = child
  } 
}