import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '.././services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilePageComponent } from './profile-page.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
/* describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let userService: UserService;
  let af: AngularFireAuth;
  let router: Router;
  let db: AngularFireDatabase;

  beforeEach(() => {
    af = new AngularFireAuth(firebase.initializeApp(environment.firebase));
    db = new AngularFireDatabase(firebase.app());
    userService = new UserService(af, db, null);
    component = new ProfilePageComponent(userService, af);
  });



  it('should return object', () => {
    expect(component.ngOnInit).toBeTruthy();
  });
});
 */