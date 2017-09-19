import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Injectable } from '@angular/core';
import { Product } from '../models/product-model';
import { PRODUCTS } from '../homepage/products';
import { DOCUMENT } from '@angular/platform-browser';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()

export class ProductsListService {
	products: FirebaseListObservable<any>;
	product: Product;
	products2: Product[];
	selectedItems: FirebaseListObservable<any>;
	selectedItems2: Product[];

	
	constructor(private db: AngularFireDatabase) {
		this.db = db;
	  	this.products = db.list('/products');
	}

	getAll(): FirebaseListObservable<any[]>{
		//this.products2 = PRODUCTS;
		//return Promise.resolve(this.products2);
		//let content = this.db.list('/products');
		//this.products.subscribe(res=> console.log(res));
		this.selectedItems = this.products;
		return this.selectedItems;
	}

	selectProducts(prop, propValue):Product[] {
		this.products2 = PRODUCTS;
		this.selectedItems2 = this.products2.filter(function(obj) {
		  if(prop === 'category')
				return obj.category === propValue;
			else if (prop === 'type')
				return obj.type === propValue;
			});
		console.log(this.selectedItems);
		return this.selectedItems2;
	};

	search(arr, originalArr, searchTerm): Product[] {
		let term = searchTerm;
		arr = originalArr.filter(function(tag) {
			return tag.name.indexOf(term) >= 0 ||  tag.category.indexOf(term) >= 0 || tag.type.indexOf(term) >= 0
		}); 
		console.log(arr);
		return arr;
	}

	getItem(item):Product {
		let index = PRODUCTS.indexOf(item);
		return PRODUCTS[index];
	};

	getUserTemplates (currentUser, templates:any[]) {
		templates = currentUser.gallery;
		return templates;
	}

	
	setProduct(product: Product): firebase.Promise<void> {
		return this.products.push(product);
	  }
	  
}