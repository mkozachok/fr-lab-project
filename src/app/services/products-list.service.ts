import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Injectable } from '@angular/core';
import { Product } from '../models/product-model';
import { PRODUCTS } from '../homepage/products';
import { DOCUMENT } from '@angular/platform-browser';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';

@Injectable()

export class ProductsListService {
	products: FirebaseListObservable<any>;
	selectedItems;
	product: Product;
	
	constructor(private db: AngularFireDatabase) {
		this.db = db;
		this.products = db.list('/products');  
		this.selectedItems = this.products;
	}

	getAll(): Observable<Array<any>>{
		return this.selectedItems;
	}

	selectProducts(prop, propValue) {
		this.selectedItems = this.products.map(items => {
			const filtered = items.filter(item => item.category === propValue || item.type === propValue);
			return filtered;
		});
		return this.selectedItems;
	};

	search(searchTerm) {
		let term = searchTerm;
		this.selectedItems = this.products.map(items => {
			const filtered = items.filter(function(tag) {
				return tag.name.indexOf(term) >= 0 ||  tag.category.indexOf(term) >= 0 || tag.type.indexOf(term) >= 0
			}); 
			return filtered;
		});
		console.log(this.selectedItems);
		return this.selectedItems;
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