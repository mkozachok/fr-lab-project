import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { CommonService, ProductsListService, DesignService } from '../../../../services';
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})

export class EditProductComponent implements OnInit {
  editProductSubscription: Subscription = new Subscription();
  category: Observable<Array<string>>;
  types: Observable<Array<string>>;
  waitForDelivery: boolean;
  productForm: FormGroup;

  ReferenceToProducts: string = 'products';
  constructor(
    private _formBuilder: FormBuilder,
    private _designService: DesignService,
    public snackBar: MdSnackBar,
    private _productService: ProductsListService,
    private _commonService: CommonService,
    public dialogRef: MdDialogRef<EditProductComponent>,
    @Inject(MD_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.editProductSubscription.add(this._designService.getDesignCategory().subscribe(res => {
      this.category = res.map(el => el.category)
    }))

    this.editProductSubscription.add(this._productService.getTemplateTypes().subscribe(res => {
        this.types = res.map(el => el.type)
      }));
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

  ngOnDestroy(){
    this.editProductSubscription.unsubscribe();
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

