import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  error: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  onSubmit(value: any) {
    this.error = null;
    this.userService.registerUser(value.email, value.password)
      .catch(err => this.error = err);

  }

}
