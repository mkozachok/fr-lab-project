import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { }

  logIn(email: string, password: string):firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logOut():void {
    this.router.navigate(['/login-page'])
      .then(() => this.afAuth.auth.signOut());
  }

  getUser():Observable<any> {
    return this.afAuth.authState;
  }

  updateUser(name, photoURL, /*email  password */):void {
     this.afAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: photoURL
    })
    //this.afAuth.auth.currentUser.updateEmail(email);
    //this.afAuth.auth.currentUser.updatePassword(password);
  }


  registerUser(email: string, password: string):firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      (success) => { this.afAuth.auth.currentUser.sendEmailVerification(); }
    )
  }

  authInfo():Observable<any> {
    return this.afAuth.authState;
  }

}
