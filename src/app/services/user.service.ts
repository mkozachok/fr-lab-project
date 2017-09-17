import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment';
import { Upload } from '../models/upload-model';
import * as firebase from 'firebase';

@Injectable()
export class UserService {
  users: FirebaseListObservable<any>;
  URL: string;
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
    this.users = db.list('/users');
  }
  private basePath:string = '/avatars';
  uploads: FirebaseListObservable<Upload[]>;

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


  getUserId(){
    return this.afAuth.auth.currentUser.uid;
  }

  isUserLogIn(){
    return this.afAuth.auth.currentUser;
  }

  updateUser(name, photoURL, /*email  password */) {
    return this.afAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: photoURL
    })
    //this.afAuth.auth.currentUser.updateEmail(email);
    //this.afAuth.auth.currentUser.updatePassword(password);
  }


  registerUser(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((success) => this.afAuth.auth.currentUser.sendEmailVerification())

  }

  createUserAdditionalInformation( phone: string, address: string) {
    return this.users.set(
      this.afAuth.auth.currentUser.uid,
      {
        orders: [""],
        gallery: [""],
        additionalInfo: {
          phone: phone,
          address: address
        }
      })
          .then((success) => console.log(this.afAuth.auth.currentUser))
  }

  getUserInformation() {

  }


  createPrimaryInformation(upload: Upload, name: string, surname: string) {
    console.log();
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    return uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        console.log(upload.url)
        this.afAuth.auth.currentUser.updateProfile({
          displayName: `${name} ${surname}`,
          photoURL: upload.url
        })
      }
    );
  }

}
