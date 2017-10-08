import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty-content',
  templateUrl: './empty-content.component.html',
  styleUrls: ['./empty-content.component.scss']
})
export class EmptyContentComponent implements OnInit {
@Input() message: string;
@Input() icon: string; 

  constructor() { }

  ngOnInit() {
  }

}
