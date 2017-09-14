import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Injectable } from '@angular/core';
import { Product } from '../models/product-model';
import { PRODUCTS } from '../homepage/products';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class ProductsListService {
	@Input() selectedItems;

	getAll(): Promise<Product[]> {
		return Promise.resolve(PRODUCTS);
	}

	selectProducts(prop, propValue, arr, originalArr):Product[] {
		arr = originalArr.filter(function(obj) {
		  if(prop === 'category')
				return obj.category === propValue;
			else if (prop === 'type')
				return obj.type === propValue;
			});
		return arr;
	};

	searchProduct(field, arr, originalArr):Product[] {
		let val = field.value
		console.log(val);
		let pattern = /^val/i;
		console.log(pattern)
		arr = originalArr.filter(function(obj) {
				if(obj.type.search(pattern) !== -1) {
					return obj;
			}
		})
		console.log(arr);
		return arr;
	}

	getItem(item):Product {
		let index = PRODUCTS.indexOf(item);
		return PRODUCTS[index];
	}
}