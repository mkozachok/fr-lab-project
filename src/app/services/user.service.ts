import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  users: FirebaseListObservable<any>;
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.users = db.list('/users');
  }

  logIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((success) => console.log(this.afAuth.auth.currentUser));
  }
  logOut() {
    this.router.navigate(['/login-page'])
      .then(() => this.afAuth.auth.signOut());
  }

  getUser() {
    return this.afAuth.authState;
  }

  updateUser(name, photoURL, /*email  password */) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: photoURL
    })
    //this.afAuth.auth.currentUser.updateEmail(email);
    //this.afAuth.auth.currentUser.updatePassword(password);
  }


  registerUser(email: string, password: string, name: string, surname: string, photoURL: string, address: string, phone: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((success) => this.afAuth.auth.currentUser.updateProfile({
        displayName: `${name} ${surname}`,
        photoURL: photoURL
      }))
      .then((success) => console.log(this.afAuth.auth.currentUser))
      .then((success) => this.users.set(
        this.afAuth.auth.currentUser.uid,
        {
          orders: [""],
          gallery: [""],
          additionalInfo: {
            phone: phone,
            address: address
          }
        }))
      .then((success) => this.afAuth.auth.currentUser.sendEmailVerification())

  }

}