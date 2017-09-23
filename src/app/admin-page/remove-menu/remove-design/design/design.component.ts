import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DesignService } from '../../../../services/design.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
  @Input() name: string;
  @Input() url: string;
  @Input() $key: string;
  @Output() notify: EventEmitter<object> = new EventEmitter<object>();

  constructor(
    private _designService: DesignService
  ) { }

  ngOnInit() {

  }

  onClick() {
    return this.notify.emit({ url: this.url, name: this.name });
  }

  deleteDesign() {
    this._designService.deleteDesignImg(this.url);
    this._designService.deleteDesign(this.$key);
  }
}
