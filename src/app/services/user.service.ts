import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {
  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  onLogginigIn(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email,password);
    this.afAuth.authState.subscribe(response => console.log(response))
  }
  onLogOut() {
    this.afAuth.auth.signOut();
    this.afAuth.authState.subscribe(response => console.log(response))
  }

}
