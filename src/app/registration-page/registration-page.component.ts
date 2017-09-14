import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  error: any;
  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(value: any) {
    this.error = null;
    this._userService.registerUser(value.email, value.password)
      .then((success) => this.router.navigate(['']))
      .catch(err => this.error = err);

  }

}
