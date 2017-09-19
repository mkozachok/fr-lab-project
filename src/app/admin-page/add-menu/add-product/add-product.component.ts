import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ProductsListService } from '../../../services/products-list.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup
  
    constructor(
      private _formBuilder: FormBuilder,
      public snackBar: MdSnackBar,
      private _productService: ProductsListService
    ) { }
  
    ngOnInit(): void {
      this.productForm = this._formBuilder.group({
        id: [],
        category: [],
        name: [],
        price: [],
        svg: [],
        type: []
      })
    }
  
    onSubmit(): void {
      this._productService.setProduct(this.productForm.value).then(resolve => {
        this.openSnackBar('The produc has been saved', 'success');
      }).catch(error => {
        this.openSnackBar(error.name, 'error');
      });
    }
  
    openSnackBar(message: string, action: string): void {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }

}
