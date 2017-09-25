import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs'
import { MakeOrderService } from '../../../services/make-order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @Input() date: string;
  @Input() totalSum: string;
  @Input() $key: string;
  @Input() orders: Observable<Array<any>>;
  @Input() userInfo: Array<string>;

  constructor(
    private _makeOrderService: MakeOrderService
  ) {}

  ngOnInit() {
  }

  accept(){
    this._makeOrderService.updateOrder().update(this.$key, {new:false});
  }

}
