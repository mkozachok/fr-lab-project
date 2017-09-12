import { Component, OnInit } from '@angular/core';
import { DesignService } from '../design-service/design.service';
import { Design } from '../models/design-model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [DesignService]
})
export class LoginPageComponent implements OnInit {
  designs = [];
  designTwo = {};
  constructor(private _designService: DesignService) { }

  ngOnInit() {
    this._designService.getAll()
      .subscribe(design => this.designs = design);
    this._designService.getOne('2')
        .subscribe(design => this.designTwo = design);
        console.log(this.designTwo)
}
  }
