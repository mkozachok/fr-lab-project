import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  constructor(private _userService: UserService, public snackBar: MdSnackBar) { 
    
    this._userService.getUser().subscribe(res => {
      this.user.firstName = res.displayName.split(' ')[0];
      this.user.lastName = res.displayName.split(' ')[1];
      this.user.email = res.email;
      this.user.phone = res.phoneNumber;
    });
  }

  ngOnInit() {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message = "Changes are saved", action="success", {
      duration: 2000,
    });
  }


}
