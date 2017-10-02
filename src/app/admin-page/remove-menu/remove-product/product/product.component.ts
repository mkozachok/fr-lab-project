import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductsListService } from '../../../../services/products-list.service';
import { MdDialog } from '@angular/material';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
@Input() name: string;
@Input() $key: string;
@Input() category: string;
@Input() owner: string;
@Input() svg: string;
@Input() price: string;
@Input() type: string;


  constructor(
    private _productService: ProductsListService,
    public dialog: MdDialog
  ) { }

  ngOnInit() {

  }

  onDelete(){
    this._productService.deleteProductImg(this.svg);
    this._productService.deleteProduct(this.$key)
  }

  onEdit(){
    let dialogRef = this.dialog.open(EditProductComponent, {
      data: {
        $key: this.$key,
        name: this.name,
        category: this.category,
        owner: this.owner,
        price: this.price,
        type: this.type
      }
    });
  }

}
