import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Product } from '../models/product-model';

@Injectable()
export class ProductService {
  products: FirebaseListObservable<any>;
  product: Product
  constructor(
    private db: AngularFireDatabase,
  ) {
    this.products = db.list('/products');
  }

  setProduct(product: Product): firebase.Promise<void> {
    return this.products.push(product).then(res=>console.log(res));
  }

}
