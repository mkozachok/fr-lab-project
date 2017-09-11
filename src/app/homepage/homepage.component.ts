import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product-model'
import { ProductsListService } from './products-list.service';
import { PRODUCT_TYPE_FILTER, PRODUCT_CATEGORY_FILTER } from './filter';

@Component({
  moduleId: module.id,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [ProductsListService]
})

export class HomepageComponent implements OnInit {
  productsCategory: any[] = PRODUCT_CATEGORY_FILTER;
  procuctsType: any[] =  PRODUCT_TYPE_FILTER;
  products: Product[];
  selectedItems: Product[];
  selectProducts(prop, propValue) {
    this.selectedItems = this.products.filter(function(obj) {
      if(prop === 'category')
        return obj.category === propValue;
      else 
        return obj.type === propValue;
    });
    console.log(this.selectedItems);
    return this.selectedItems;
  };
  constructor(private productListService: ProductsListService) { };

  getAll():void {
    this.productListService.getAll().then(products => this.products = products);
    this.productListService.getAll().then(selectedItems => this.selectedItems = selectedItems);
  };

  ngOnInit():void {
    this.getAll();
  };
}
