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

  updateUser(name, photoURL, /*email  password */) {
    this.afAuth.auth.currentUser.updateProfile({
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

  createUserInformation(name: string, surname: string, address: string, phone: string, profilePicture: string) {
    firebase.storage().ref().child(`${this.basePath}/myAvatar.png`).getDownloadURL()
      .then((url) => this.URL = url)
      .catch((err) => console.log(err))
    return this.afAuth.auth.currentUser.updateProfile({
      displayName: `${name} ${surname}`,
      photoURL: `${this.URL}`
    })
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
  }


  pushUpload(upload: Upload) {
    console.log();
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);
    return uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        console.log(upload.url);
        console.log(upload.name);
        // this.saveProfilePicture(upload)
      }
    );
  }
  // private saveProfilePicture(upload: Upload) {
  // this.users.set(this.afAuth.auth.currentUser.uid, {});
// }
}
