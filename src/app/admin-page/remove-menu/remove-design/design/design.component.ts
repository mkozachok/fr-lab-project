import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DesignService } from '../../../../services/design.service';
import { MdDialog } from '@angular/material';
import { EditDesignComponent } from '../edit-design/edit-design.component';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
  @Input() name: string;
  @Input() url: string;
  @Input() $key: string;
  @Input() price: string;
  @Input() category: string;
  @Input() multiDelete: boolean;
  @Output() checkedProduct:EventEmitter<object> = new EventEmitter<object>();

  constructor(
    private _designService: DesignService,
    public dialog: MdDialog
  ) { }

  ngOnInit() {

  }

  deleteDesign() {
    this._designService.deleteDesignImg(this.url);
    this._designService.deleteDesign(this.$key);
  }

  onEdit(){
    let dialogRef = this.dialog.open(EditDesignComponent, {
      data: {
        $key: this.$key,
        name: this.name,
        price: this.price,
        category: this.category
      }
    });
  }

  onChange($event){
    this.checkedProduct.emit({$key: this.$key, checked: $event.checked, url: this.url})
  }
}
