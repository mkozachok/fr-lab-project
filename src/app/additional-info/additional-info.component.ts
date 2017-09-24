import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss']
})
export class AdditionalInfoComponent implements OnInit {
  error: Error;
  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  onSubmit(value: any) {
    this.error = null;
    this._userService.createUserAdditionalInformation(value.phone, value.address)
      .then((success) => this.router.navigate(['']))
      .catch(err => this.error = err);
  }
}
