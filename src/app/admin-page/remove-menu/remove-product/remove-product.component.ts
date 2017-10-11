import { Component, OnInit } from '@angular/core';
import { ProductsListService, CommonService } from '../../../services';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.scss']
})
export class RemoveProductComponent implements OnInit {
  iconEmpty: string = 'collections';
  messageEmpty: string = 'There are no products';
  iconNotFound: string = 'search';
  messageNotFound: string = 'There are no products you are loking for';
  deleteType: string = 'single deleting';
  productsForMultiDeleting: Array<any> = [];
  multiDelete: boolean;
  removeProductSubscription: Subscription = new Subscription();
  photoUrl: string;
  name: string;
  productList: Observable<Array<any>>;
  arrOfProducts: Observable<Array<any>>;
  showSpinner: boolean = true;
  onHover: boolean = false;
  constructor(
    private _productService: ProductsListService,
    private commonService: CommonService
  ) { }

  getProductsArr() {
    let tempArr;
    this.removeProductSubscription.add(this._productService.getProducts().subscribe(res => {
      this.showSpinner = false;
      tempArr = res.reverse();
      this.productList = tempArr;
      this.arrOfProducts = this.productList;
    }));
  }

  ngOnInit() {
    this.getProductsArr();
  }

  ngOnDestroy() {
    this.removeProductSubscription.unsubscribe();
  }

  filterItem(phrase) {
    this.productList = this.arrOfProducts;
    this.productList = this._productService.findProduct(phrase, this.productList);
  }

  changeDeleteType() {
    this.multiDelete = !this.multiDelete;
    this.deleteType = this.multiDelete ? 'multi deleting' : 'single deleting';
    this.productsForMultiDeleting = [];
  }

  checkedProduct({$key, checked, url}) {
    let index;
    if (checked) {
      this.productsForMultiDeleting.push({id: $key, url: url })
    } else {
      index = this.productsForMultiDeleting
        .map(el => el.id)
        .indexOf($key)
      this.productsForMultiDeleting.splice(index, 1);
    }

  }

  deleteSelected() {
    if(this.productsForMultiDeleting.length){
      this._productService.deleteArrayOfProducts(this.productsForMultiDeleting)
    }else{
      this.commonService.openSnackBar('Please, select products for delating', 'required');
    }
  }

}
