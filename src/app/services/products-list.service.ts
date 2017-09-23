import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
	prods: FirebaseListObservable<any>;
	filtered: FirebaseListObservable<any>;
	
	constructor(private db: AngularFireDatabase) {
		this.db = db;
		this.products = db.list('/products');  
		this.prods = db.list('/products');
	}

	getAll(){
		return this.prods
	}

	selectProducts(prop, propValue) {
		return this.prods.map(items => {
			const filtered = items.filter(item => item.category === propValue || item.type === propValue);
			return filtered;
		});
	};

	search(search) {
		return this.prods.map(items => {
			const filtered = items.filter(item => item.category.indexOf(search) >=0 || item.type.indexOf(search) >=0 || item.name.indexOf(search) >=0);
			return filtered;
		});
	}

	getItem(item): Product {
		let index = PRODUCTS.indexOf(item);
		return PRODUCTS[index];
	};

	getUserTemplates(currentUser, templates: any[]) {
		templates = currentUser.gallery;
		return templates;
	}

	setProduct(product: Product): firebase.Promise<void> {
		return this.products.push(product);
	}

	getProducts() {
		return this.products;
	}

	deleteProduct(id) {
		this.db.database.ref('/products').child(id).remove();
	}

	findProduct(phrase, arrayOfProducts) {
		let transformedPhrase = phrase.toLowerCase();
		return arrayOfProducts.filter(x => {
			return x['category'].toLowerCase().indexOf(transformedPhrase) >= 0 ||
				x['name'].toLowerCase().indexOf(transformedPhrase) >= 0 ||
				x['owner'].toLowerCase().indexOf(transformedPhrase) >= 0;
		});
	}
}