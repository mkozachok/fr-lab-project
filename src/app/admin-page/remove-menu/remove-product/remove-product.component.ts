import { Component, OnInit } from '@angular/core';
import { ProductsListService } from '../../../services/products-list.service';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.scss']
})
export class RemoveProductComponent implements OnInit {

  constructor(
    private _productService: ProductsListService
  ) { }

  ngOnInit() {
  }

}
