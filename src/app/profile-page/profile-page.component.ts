import {
  Component,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  group
} from '@angular/core';
import { UserService, AdminService } from '.././services';
import { User } from '../models/user-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
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
export class ProfilePageComponent implements OnInit {
  public showSpinner = true;
  user = {};
  ProfilePageSubscription: Subscription = new Subscription();
  isAdmin: boolean;
  menuState: string = 'opened';
  width: boolean = (window.innerWidth < 960)? true : false;;
  icon: string = 'keyboard_arrow_left';
  constructor(
    private _userService: UserService,
    private _adminService: AdminService
  ) {
    window.onresize = (e) => {
      this.width = (window.innerWidth < 960)? true : false;
      if(!this.width){
        this.menuState = 'opened';
      }
    }
  }
  toggleMenu(){
    this.icon = (this.menuState==='opened')? 'keyboard_arrow_right': 'keyboard_arrow_left';
    this.menuState = (this.menuState==='opened') ? 'closed' : 'opened';
  }

  getUser() {
    this.ProfilePageSubscription.add(this._userService.getUser().subscribe(res => {
      this.showSpinner = false;
      return this.user = res
    }));

  }

  

  ngOnInit() {
    this.ProfilePageSubscription.add(this._userService.getUserIdAsync().subscribe(user => {
      let id = user ? user.uid : 'Please login';
      this.ProfilePageSubscription.add(this._adminService.getAdmin(id).subscribe(admin => {
        if (admin.length > 0) {
          this.isAdmin = true;
        }
      }))
      this.getUser()
    }))


  }

  ngOnDestroy() {
    this.ProfilePageSubscription.unsubscribe();
  }


}
