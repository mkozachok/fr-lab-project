import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ProductsListService } from '../../services/products-list.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-size-dialog',
  templateUrl: './size-dialog.component.html',
  styleUrls: ['./size-dialog.component.css']
})
export class SizeDialogComponent implements OnInit {

  templateTypes: FirebaseListObservable<any>;

  constructor(public thisDialogRef: MdDialogRef<SizeDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: string,
              private productService: ProductsListService) { }

  ngOnInit() {
    this.thisDialogRef.updatePosition({ top: '12%' });
    this.productService.getTemplateTypes().subscribe(res => {
      this.templateTypes = res;
    });
  }

  onCloseConfirm(product, size) {
    this.productService.setSize(product, size);
  	this.thisDialogRef.close('close');
  }

}
