import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Product } from '../../models/product-model';
import { ViewOneProductComponent } from '../view-one-product/view-one-product.component';
import { ProductsListService } from '../../services/products-list.service';
import { OrderService } from '../../order-page/order-page.service';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.scss'],
  providers: [ProductsListService, OrderService]
})

export class ViewAllProductsComponent implements OnInit {
  @Input()
  @Output() click = new EventEmitter();
  @Input() products: FirebaseListObservable<any>;
  @Input() selectedItems;

  constructor(private productListService: ProductsListService, private orderService: OrderService) { 
  };

  getAll():void {
    this.productListService.getAll().subscribe(res=> {
      this.selectedItems = res;
    });
    //this.productListService.getAll().then(selectedItems => this.selectedItems = selectedItems);
    
  };

  ngOnInit():void {
    this.getAll();
   };
}
