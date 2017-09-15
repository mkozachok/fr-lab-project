import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public snackBar: MdSnackBar,
    private _productService: ProductService
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
    this.snackBar.open(message = "Changes are saved", action = "success", {
      duration: 2000,
    });
  }

}
