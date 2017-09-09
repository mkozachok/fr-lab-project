import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product-model'
import { ProductsListService } from './products-list.service';
import {MdGridListModule} from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  providers: [ProductsListService]
})

export class HomepageComponent implements OnInit {
  products: Product[];
  constructor(private productListService: ProductsListService) { };

  getAll():void {
    this.productListService.getAll().then(products => this.products = products);
  };

  ngOnInit():void {
    this.getAll();
  };
}


