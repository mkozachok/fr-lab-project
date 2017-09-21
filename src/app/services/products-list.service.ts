import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Injectable } from '@angular/core';
import { Product } from '../models/product-model';
import { PRODUCTS } from '../homepage/products';
import { DOCUMENT } from '@angular/platform-browser';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()

export class ProductsListService {
	products: FirebaseListObservable<any>;
	selectedItems: FirebaseListObservable<any>;
	product: Product;
	productsArray: Product[];
	selectedItemsArray: Product[];

	
	constructor(private db: AngularFireDatabase) {
		this.db = db;
	  	this.products = db.list('/products');
	}

	getAll(): FirebaseListObservable<any[]>{
		this.selectedItems = this.products;
		return this.selectedItems;
	}

	selectProducts(prop, propValue) {
		let productsArray = JSON.parse(JSON.stringify(this.products));
		let selectedItemsArray = JSON.parse(JSON.stringify(this.selectedItems));
		selectedItemsArray = productsArray.filter(function(obj) {
		  if(prop === 'category')
				return obj.category === propValue;
			else if (prop === 'type')
				return obj.type === propValue;
			});
		return selectedItemsArray;
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
		
		getProducts() {
			return this.products;
		}
}