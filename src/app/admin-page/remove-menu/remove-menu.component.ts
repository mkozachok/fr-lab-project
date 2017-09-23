import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remove-menu',
  templateUrl: './remove-menu.component.html',
  styleUrls: ['./remove-menu.component.scss']
})
export class RemoveMenuComponent implements OnInit {
  designPhotoUrl: string;
  designName: string;
  constructor() { }

  ngOnInit() {
  }

  onNotify(obj){
    this.designName = obj.name;
    this.designPhotoUrl = obj.url;
    console.log('from r-m', obj)
  }
}
