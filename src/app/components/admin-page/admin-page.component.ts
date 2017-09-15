import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ProductsListService } from '../../services/products-list.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  productForm: FormGroup;
  message: string = '1';
  action: string = '1';

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
    this._productService.setProduct(this.productForm.value);
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message = this.message, action= this.action, {
      duration: 2000,
    });
  }

}
