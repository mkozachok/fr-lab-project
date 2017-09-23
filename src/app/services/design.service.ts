import { Injectable } from '@angular/core';
import { Design } from '../models/design-model';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from "firebase";

@Injectable()
export class DesignService {
  designs:FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.db = db;
    this.designs = db.list('/redactor/design');
  }

  setDesign(design): firebase.Promise<void>  {
    return this.designs.push(design);
  }

  getDesigns() {
    return this.db.list('/redactor/design');
  }

  deleteDesign(id):firebase.Promise<boolean>{
      return this.db.database.ref('/redactor/design').child(id).remove();
  }

  deleteDesignImg(url):firebase.Promise<boolean>{
    return firebase.storage().refFromURL(url).delete();
  }

  findDesign(phrase, arrayOfDesigns) {
    let transformedPhrase = phrase.toLowerCase();
    return arrayOfDesigns.filter(x => {
      return x['name'].toLowerCase().indexOf(transformedPhrase) >= 0;
    });
  }

}
