import { Product } from '../models/product-model';

export class Order {
	public product: Product;
	public quantity: number;

	constructor( product:Product, quantity:number) {
		this.product = product;
		this.quantity = quantity;
	}
}
