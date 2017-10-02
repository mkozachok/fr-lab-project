import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ProductsListService } from '../../../services/products-list.service';
import { Product } from '../../../models/product-model';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  isAddContentPage: boolean;
  waitForDelivery: boolean;
  productForm: FormGroup;

  ReferenceToProducts: string = 'products';
  product = {
    name: '',
    type: '',
    category: '',
    svg: '',
    layouts: [],
    owner: '',
    price: 0,
  };
  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MdSnackBar,
    private _productService: ProductsListService
  ) { }

  ngOnInit(): void {

    //console.log(this.dialogData)
    this.isAddContentPage = this._productService.checkPath('/add-menu');

    this.productForm = this._formBuilder.group({
      category: [null, 
        [
          Validators.required
      ]
    ],
      name: [null, 
        [
          Validators.required
      ]
    ],
      price: [null, 
        [
          Validators.required
      ]
    ],
      owner: [null],
      type: [null, 
        [
          Validators.required
      ]
    ]
    })
  }


  onSubmit(): void {
    this.waitForDelivery = true;
    this.product.name = this.productForm.value.name;
    this.product.category = this.productForm.value.category;
    this.product.price = this.productForm.value.price;
    this.product.type = this.productForm.value.type;
    this.product.owner = this.productForm.value.owner;
  }

  openSnackBar(message: string, action: string): void {
    this.waitForDelivery = false;
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onNotify(url) {
    this._productService.setProduct({
      name: this.product.name,
      type: this.product.type,
      category: this.product.category,
      svg: url,
      layouts: [],
      owner: this.product.owner,
      price: this.product.price,
    }).then(resolve => {
      this.openSnackBar('The produc has been saved', 'success');
    }).catch(error => {
      this.openSnackBar(error.name, 'error');
    });
  }
}
