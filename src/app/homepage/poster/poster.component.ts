import { Component, OnInit } from '@angular/core';
import { SmoothScrollToDirective, SmoothScrollDirective } from "ng2-smooth-scroll";

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss', './poster.component.media.scss']
})
export class PosterComponent implements OnInit {
  title: 'create your own template';
  logoSrc = "./assets/images/colibriLogo.png";

  constructor() { }

  ngOnInit() {
  }

}
