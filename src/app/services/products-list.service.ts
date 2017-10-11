import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product-model';
import { PRODUCTS } from '../homepage/products';
import { DOCUMENT } from '@angular/platform-browser';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable, Subscription } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()

export class ProductsListService {
	products: FirebaseListObservable<any>;
	templateTypes: FirebaseListObservable<any>;

	constructor(
		private db: AngularFireDatabase,
		public router: Router
	) {
		this.db = db;
		this.products = db.list('/products');
		this.templateTypes = db.list('/templateTypes');
	}

	getProducts() {
		return this.products;
	}

	getProductByKey(key: string) {
		let product;
		this.products.forEach(el => {
			console.log(el.$key);
			if (el.$key === key) {
				product = el;
			}
		});
		return product;
	}

	getProducts2(start, end): FirebaseListObservable<any> {
		this.products = this.db.list('/products', {
			query: {
				orderByChild: 'type',
				limitToFirst: 10,
				startAt: start,
				endAt: end
			}
		});
		return this.products
	}

	getTemplateTypes() {
		return this.templateTypes;
	}

	selectProducts(propValue) {
		if (propValue == 'all') {
			return this.products;
		} else {
			return this.products.map(items => {
				const filtered = items.filter(item => item.category == propValue || item.type == propValue);
				return filtered;
			});
		}
	}

	search(search, arrOfProds) {
		let transformedPhrase = search.toLowerCase();
		return arrOfProds.filter(x => {
			return x['type'].toLowerCase()
				.indexOf(transformedPhrase) >= 0 || x['name'].toLowerCase()
					.indexOf(transformedPhrase) >= 0 || x['category'].toLowerCase()
						.indexOf(transformedPhrase) >= 0;
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

	setProduct(product): firebase.Promise<void> {
		return this.products.push(product);
	}

	updateProduct(key, product): firebase.Promise<void> {
		return this.products.update(key, product);
	}

	deleteProduct(id) {
		this.db.database.ref('/products').child(id).remove();
	}

	deleteProductImg(url) {
		firebase.storage().refFromURL(url).delete();
	}

	deleteArrayOfProducts(arr) {
		arr.forEach(el => {
			if (el.url.includes('firebasestorage.googleapis.com/v0/b/kolibri')) {
				this.deleteProductImg(el.url)
			}
			this.deleteProduct(el.id)
		})
	}

	findProduct(phrase, arrayOfProducts) {
		return arrayOfProducts.filter(x => {
			return x['category'].indexOf(phrase) >= 0 ||
				x['name'].indexOf(phrase) >= 0 ||
				x['type'].indexOf(phrase) >= 0;
		});
	}

	getProductsByIds(productKeys: Array<string>, products: FirebaseListObservable<any>) {
		return products.filter(product => {
			return productKeys.includes(product.$key);
		});
	}

	setSize(product, size) {
		return product.size = size;
	}
}
