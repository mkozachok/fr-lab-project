import { Component, OnInit } from '@angular/core';
import { MakeOrderService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-orders',
  templateUrl: './new-orders.component.html',
  styleUrls: ['./new-orders.component.scss']
})
export class NewOrdersComponent implements OnInit {
  iconEmpty:string = 'description';
  messageEmpty:string = 'There are no new orders';
  iconNotFound:string = 'search';
  messageNotFound:string = 'There are no orders you are loking for';
  noContent: boolean;
  showSpinner: boolean = true;
  orders: Observable<Array<any>>;
  originalArray: Observable<Array<any>>;
  constructor(
    private _makeOrderService: MakeOrderService
  ) { }

  getOrders(){
    this._makeOrderService.getAll().subscribe(res=>{
      this.showSpinner = false;
      this.orders = res.filter(order => order.new);
      this.originalArray = this.orders;
    })
  }

  ngOnInit() {
    this.getOrders();
  }

  filterItem(phrase){
    this.orders = this.originalArray;
    this.orders = this._makeOrderService.searachOrder(phrase, this.orders);
  }

}
