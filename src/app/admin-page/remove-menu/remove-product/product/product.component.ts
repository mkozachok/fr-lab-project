import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ProductsListService, OrderService } from '../../../../services';
import { EditProductComponent } from '../edit-product';

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
@Input() multiDelete: boolean;
@Output() checkedProduct:EventEmitter<object> = new EventEmitter<object>();


  constructor(
    private _productService: ProductsListService,
    public dialog: MdDialog,
    private orderService: OrderService
  ) { }

  ngOnInit() {

  }

  onDelete(){
    if (this.svg.includes('firebasestorage.googleapis.com/v0/b/kolibri')) {
      this._productService.deleteProductImg(this.svg);
    }
    this._productService.deleteProduct(this.$key);
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

  onChange($event){
    this.checkedProduct.emit({$key: this.$key, checked: $event.checked, url: this.svg})
  }

}
