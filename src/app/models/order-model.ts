import { Product } from '../models/product-model';

export class Order {
	public id: number;
	public product: Product;
	public quantity: number;
	// public status: string;

	constructor(id:number, product:Product, quantity:number) {
		this.id = id;
		this.product = product;
		this.quantity = quantity;
		// this.status = 'new';
	}
}
