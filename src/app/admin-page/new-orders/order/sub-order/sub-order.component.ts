import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sub-order',
  templateUrl: './sub-order.component.html',
  styleUrls: ['./sub-order.component.scss']
})
export class SubOrderComponent implements OnInit {
@Input() quantity:string;
@Input() svg: string;
@Input() name: number;
@Input() price: number;


  constructor() {}

  ngOnInit() {
  }

}
