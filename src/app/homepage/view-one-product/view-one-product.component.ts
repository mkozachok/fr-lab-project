import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../../models/product-model';
import { ProductsListService } from '../../services/products-list.service';
import { OrderService } from '../../order-page/order-page.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-view-one-product',
  templateUrl: './view-one-product.component.html',
  styleUrls: ['./view-one-product.component.scss']
})
export class ViewOneProductComponent implements OnInit {
  @Input() product;
  @Output() click = new EventEmitter();
  selectedItems: Product[];

  constructor(private productListService: ProductsListService, private orderService: OrderService) { 
  };

  ngOnInit():void {

   };

  addToCart(item) {
    this.orderService.addItem(item);
  }
}
