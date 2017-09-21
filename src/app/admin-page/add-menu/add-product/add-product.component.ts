import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ProductsListService } from '../../../services/products-list.service';
import { Product } from '../../../models/product-model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup
  ReferenceToProducts: string = 'products';
  product:Product = {
    id: 0,
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
    this.productForm = this._formBuilder.group({
      id: [null, 
        [
          Validators.required
      ]
    ],
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
      owner: [null, 
        [
          Validators.required
      ]
    ],
      type: [null, 
        [
          Validators.required
      ]
    ]
    })
  }

  onSubmit(): void {
    this.product.id = this.productForm.value.id;
    this.product.name = this.productForm.value.name;
    this.product.category = this.productForm.value.category;
    this.product.price = this.productForm.value.price;
    this.product.type = this.productForm.value.type;
    this.product.owner = this.productForm.value.owner;
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onNotify(url) {
    this._productService.setProduct({
      id: this.product.id,
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
