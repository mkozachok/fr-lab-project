import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-ordered-product',
  templateUrl: './ordered-product.component.html',
  styleUrls: ['./ordered-product.component.scss']
})
export class OrderedProductComponent implements OnInit {

	@Input() item;

	constructor() { }

	ngOnInit() {
	}

}
