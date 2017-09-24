import { Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Product } from '../../models/product-model'
import { ProductsListService } from '../../services/products-list.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import * as _ from 'lodash'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ProductsListService]
})
export class SearchComponent implements OnInit, OnDestroy {
  @Input()
  @Output() click = new EventEmitter();
  prods: Observable<Array<any>>;;
  subscriptionToSearch: Subscription;
  constructor(private productListService: ProductsListService) { 
  };

  getAll() {
    this.subscriptionToSearch = this.productListService.getAll().subscribe((res=> {
      this.prods = res;
      console.log(this.prods);
    }));
  }

  ngOnInit() {
    this.getAll();
  };

  search(search) {
    this.prods = this.productListService.search(search, this.prods);
    console.log(this.prods);
  }

  ngOnDestroy(){
    this.subscriptionToSearch.unsubscribe();
  }
}