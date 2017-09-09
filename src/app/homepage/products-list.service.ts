import { Injectable } from '@angular/core';
import { Product } from '../models/product-model';
import { PRODUCTS } from './products';


@Injectable()
export class ProductsListService {
	getAll(): Promise<Product[]> {
		return Promise.resolve(PRODUCTS);
	}
}