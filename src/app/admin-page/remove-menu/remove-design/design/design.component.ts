import { Component, OnInit, Input } from '@angular/core';
import { DesignService } from '../../../../services/design.service';

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
@Input() name: string;
@Input() svg: string;
@Input() $key: string;

  constructor(
    private _designService: DesignService
  ) { }

  ngOnInit() {
    
  }

  deleteDesign(){
    this._designService.deleteDesign(this.$key);
  }
}
