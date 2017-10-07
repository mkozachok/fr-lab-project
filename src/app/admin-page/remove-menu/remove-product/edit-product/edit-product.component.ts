import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { CommonService, ProductsListService } from '../../../../services';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})

export class EditProductComponent implements OnInit {
  waitForDelivery: boolean;
  productForm: FormGroup;

  ReferenceToProducts: string = 'products';
  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MdSnackBar,
    private _productService: ProductsListService,
    private _commonService: CommonService,
    public dialogRef: MdDialogRef<EditProductComponent>,
    @Inject(MD_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {

    this.productForm = this._formBuilder.group({
      category: [this.data.category,
      [
        Validators.required
      ]
      ],
      name: [this.data.name,
      [
        Validators.required
      ]
      ],
      price: [this.data.price,
      [
        Validators.required
      ]
      ],
      owner: [this.data.owner],
      type: [this.data.type,
      [
        Validators.required
      ]
      ]
    })
  }

  onSubmit(): void {
    let product = this.productForm.value;
    this.waitForDelivery = true;
    this.dialogRef.disableClose;
    this._productService.updateProduct(this.data.$key, {
      name: product.name,
      type: product.type,
      category: product.category,
      owner: product.owner,
      price: product.price,
    }).then(() => {
      this._commonService.openSnackBar('The product has been updated', 'success');
      this.dialogRef.close();
    }).catch(error => {
      this._commonService.openSnackBar(error.name, 'error');
    });

  }
}

