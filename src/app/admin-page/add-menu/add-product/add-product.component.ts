import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { Product } from '../../../models/product-model';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import {
  CommonService,
  ProductsListService,
  DesignService
} from '../../../services';
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductSubscription: Subscription = new Subscription();
  isAddContentPage: boolean;
  waitForDelivery: boolean;
  productForm: FormGroup;
  category: Observable<Array<string>>;
  types: Observable<Array<string>>;

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
    private _productService: ProductsListService,
    private _commonService: CommonService,
    private _designService: DesignService
  ) { }

  ngOnInit(): void {
    this.addProductSubscription.add(this._designService.getDesignCategory().subscribe(res => {
      this.category = res.map(el => el.category)
    }))

    this.addProductSubscription.add(this._productService.getTemplateTypes().subscribe(res => {
        this.types = res.map(el => el.type)
      }));
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

  ngOnDestroy(){
    this.addProductSubscription.unsubscribe()
  }

  onSubmit(): void {
    this.waitForDelivery = true;
    this.product.name = this.productForm.value.name;
    this.product.category = this.productForm.value.category;
    this.product.price = this.productForm.value.price;
    this.product.type = this.productForm.value.type;
    this.product.owner = this.productForm.value.owner;
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
          fromAdminPanel: true
        }).then(resolve => {
          this._commonService.openSnackBar('The produc has been saved', 'success');
        }).catch(error => {
          this._commonService.openSnackBar(error.name, 'error');
        }).then(() => this.waitForDelivery = false); 
  }
}
