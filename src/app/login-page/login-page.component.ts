import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

  export class LoginPageComponent implements OnInit {

    constructor(private userService: UserService) { }

    ngOnInit() {
    }

    onSubmit(value: any) {
        this.userService.onLogginigIn(value.email, value.password);
    }

    logOut() {
      this.userService.onLogOut();
    }
  }
