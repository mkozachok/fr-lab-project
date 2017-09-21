import { Component, OnInit } from '@angular/core';
import { SmoothScrollToDirective, SmoothScrollDirective } from "ng2-smooth-scroll";

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent implements OnInit {
  title: 'create your own template';

  constructor() { }

  ngOnInit() {
  }

}
