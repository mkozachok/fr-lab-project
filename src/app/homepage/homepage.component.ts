import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { PosterComponent } from './poster/poster.component';
import { ViewAllProductsComponent } from './view-all-products/view-all-products.component';
import { SearchComponent } from './search/search.component';
import { FiltersComponent } from './filters/filters.component';
import { SmoothScrollToDirective, SmoothScrollDirective } from "ng2-smooth-scroll";
import { Product } from '../models/product-model'

@Component({
  moduleId: module.id,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {
  @Input() prods: Product[];
  @Input() filtered: Product[];

  constructor() { 
  };

  ngOnInit():void {
   };
}
