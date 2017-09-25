import { Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { Product } from '../../models/product-model'
import { ProductsListService } from '../../services/products-list.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable} from 'rxjs';
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
  prods: any[];
  constructor(private productListService: ProductsListService) { 
  };
/*
  getAll() {
    this.subscriptionToSearch = this.productListService.getAll().subscribe((res=> {
      this.prods = res;
      console.log(this.prods);
    }));
  }*/

  ngOnInit() {
    
  };

  search(search) {
    this.productListService.getAll().subscribe((items) => {this.prods = items});
    this.prods = this.productListService.search(search, this.prods);
    console.log(this.prods);
  }
}