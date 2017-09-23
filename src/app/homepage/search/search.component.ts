import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../../models/product-model'
import { ProductsListService } from '../../services/products-list.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ProductsListService]
})
export class SearchComponent implements OnInit {
  @Input()
  @Output() click = new EventEmitter();
  @Input() prods: FirebaseListObservable<any>;

  constructor(private productListService: ProductsListService) { 
  };

  ngOnInit():void {
   };

  search(search: string) {
    console.log(search)
    this.productListService.search(search).subscribe((res=> { 
      this.prods = res;
      console.log(this.prods)
    }))
  }
}