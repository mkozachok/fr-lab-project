import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  animations: [
    trigger('menuState',[
      state('opened', style({
        transform: 'translateX(0)'
      })),
      state('closed', style({
        transform: 'translateX(-90vw)'
      })),
      transition('opened <=> closed', [animate('1s')])
    ])
  ]
})
export class AdminPageComponent implements OnInit {
  menuState: string = 'opened';
  width: boolean = (window.innerWidth < 960)? true : false;;
  icon: string = 'keyboard_arrow_left';
  constructor() {
    window.onresize = (e) => {
      this.width = (window.innerWidth < 960)? true : false;
      if(!this.width){
        this.menuState = 'opened';
        this.icon = 'keyboard_arrow_left';
      }
    }
   }

   toggleMenu(){
    this.icon = (this.menuState==='opened')? 'keyboard_arrow_right': 'keyboard_arrow_left';
    this.menuState = (this.menuState==='opened') ? 'closed' : 'opened';
  }

  ngOnInit() {
  }

}
