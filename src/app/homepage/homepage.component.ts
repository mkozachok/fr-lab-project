import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ProductsListService } from '../services/products-list.service';
import { PosterComponent } from './poster/poster.component';
import { ViewAllProductsComponent } from './view-all-products/view-all-products.component';
import { SearchComponent } from './search/search.component';
import { FiltersComponent } from './filters/filters.component';
import { SmoothScrollToDirective, SmoothScrollDirective } from "ng2-smooth-scroll";
import { Product } from '../models/product-model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';

@Component({
  moduleId: module.id,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  prods: FirebaseListObservable<any>;
  @Input() filtered: Product[];

  constructor(private productListService: ProductsListService) { 
  };

  ngOnInit():void {
    this.productListService.getAll().subscribe(items => {this.prods = items});
   };
}
