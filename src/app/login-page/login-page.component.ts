import { Component, OnInit } from '@angular/core';
import { DesignService } from '../design-service/design.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [DesignService]
})
export class LoginPageComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
