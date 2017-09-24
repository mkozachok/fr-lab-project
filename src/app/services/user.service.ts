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
  private basePath: string = '/avatars';
  uploads: FirebaseListObservable<Upload[]>;

  logIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  logOut() {
    this.router.navigate(['/login-page'])
      .then(() => this.afAuth.auth.signOut());
  }

  getUser() {
    return this.afAuth.authState;
  }
  // PAUi0aWuH5T062teCexxtByBHTB3
  getUserFromDataBase(userId) {
    let user = this.db.object('/users/' + userId);
    return user;
  }

  // getUsersGallery(userId: string) {
  //   return this.db.object('/users/' + userId + '/gallery');
  // }

  getUserId(){
    return this.afAuth.auth.currentUser.uid;
  }

  isUserLogIn() {
    return this.afAuth.auth.currentUser;
  }

  updateUser(id, name, photoURL, phone, address) {
     return this.afAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: photoURL
    }).then(res => {
      this.getUserFromDataBase(id).set({
        additionalInfo: {
          phone: phone,
          address: address
        }
      })
    })
  }

  addToUsersGallery(userId: string, productId: string) {
    return this.db.database.ref('/users').child(userId).child('gallery').push({ productKey: productId});
  }

  getUsersGallery(userId: string) {
    return this.db.list('/users/' + userId + '/gallery');
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
