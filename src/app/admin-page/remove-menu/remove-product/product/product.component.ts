import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsListService } from '../../../../services/products-list.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
@Input() name: string;
@Input() $key: string;
@Input() category: string;
@Input() owner: string;
@Input() svg: string;
@Output() notify: EventEmitter<object> = new EventEmitter<object>();

  constructor(
    private _productService: ProductsListService
  ) { }

  ngOnInit() {

  }

  onDelete(){
    this._productService.deleteProduct(this.$key)
  }

  onClick() {
    return this.notify.emit({ url: this.svg, name: this.name });
  }
}
