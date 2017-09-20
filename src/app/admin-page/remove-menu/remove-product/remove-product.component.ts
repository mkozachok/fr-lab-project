import { Component, OnInit } from '@angular/core';
import { ProductsListService } from '../../../services/products-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.scss']
})
export class RemoveProductComponent implements OnInit {
  productList: Observable<Array<any>>
  showSpinner: boolean = true;
  constructor(
    private _productService: ProductsListService
  ) { }

  ngOnInit() {
    this._productService.getProducts().subscribe(res => {
      console.log(res)
      this.showSpinner = false; 
      this.productList = res;
    });
  }

  onHover(e:MouseEvent){
    e.BUBBLING_PHASE
  }

}
