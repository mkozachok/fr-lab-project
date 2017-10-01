import { Product } from '../models/product-model';

export class Order {
	public product: Product;
	public quantity: number;
	public productKey: string;

	constructor( product:Product, quantity:number, productKey: string) {
		this.product = product;
		this.quantity = quantity;
		this.productKey = productKey;
	}
}
