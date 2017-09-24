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
@Input() price: string;

  constructor(
    private _productService: ProductsListService
  ) { }

  ngOnInit() {

  }

  onDelete(){
    this._productService.deleteProductImg(this.svg);
    this._productService.deleteProduct(this.$key)
  }

}
