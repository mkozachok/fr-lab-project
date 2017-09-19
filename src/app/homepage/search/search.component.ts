import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../../models/product-model'
import { ProductsListService } from '../../services/products-list.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ProductsListService]
})
export class SearchComponent implements OnInit {
  @Input()
  @Output() click = new EventEmitter();
  selectedItems: Product[];

  constructor(private productListService: ProductsListService) { 
  };

  ngOnInit():void {
   };

  search(arr:Product[], originalArr:Product[], searchTerm) {
    this.selectedItems = this.productListService.search(arr, originalArr, searchTerm);
  }
}