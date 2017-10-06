import { Component, OnInit } from '@angular/core';
import { ProductsListService } from '../../../services';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.scss']
})
export class RemoveProductComponent implements OnInit {
  removeProductSubscription: Subscription = new Subscription();
  photoUrl: string;
  name: string;
  productList: Observable<Array<any>>;
  arrOfProducts: Observable<Array<any>>;
  showSpinner: boolean = true;
  onHover: boolean = false;
  constructor(
    private _productService: ProductsListService
  ) { }

  getProductsArr() {
   this.removeProductSubscription.add(this._productService.getProducts().subscribe(res => {
      this.showSpinner = false;
      this.productList = res;
      this.arrOfProducts = this.productList;
    }));
  }

  ngOnInit() {
    this.getProductsArr();
  }

  ngOnDestroy(){
    this.removeProductSubscription.unsubscribe();
  }

  filterItem(phrase) {
    this.productList = this.arrOfProducts;
    this.productList = this._productService.findProduct(phrase, this.productList);
  }

}
