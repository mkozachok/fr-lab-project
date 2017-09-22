import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-img-window',
  templateUrl: './img-window.component.html',
  styleUrls: ['./img-window.component.scss']
})
export class ImgWindowComponent implements OnInit {
  @Input() photoUrl:string;
  @Input() name:string;
  
  constructor() { }

  ngOnInit() {
  }

}
