import { Injectable } from '@angular/core';
import { Design } from '../models/design-model';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from "firebase";

@Injectable()
export class DesignService {
  designs:FirebaseListObservable<any>;
  designCategories: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.db = db;
    this.designs = db.list('/redactor/design');
    this.designCategories = db.list('/redactor/designCategories');
  }

  setDesign(design): firebase.Promise<void>  {
    return this.designs.push(design);
  }

  getDesigns() {
    /*return this.db.list('/redactor/design');*/
    return this.designs;
  }

  getDesignCategory() {
    return this.designCategories;
  }

  categoryChoose(propValue) {
    if(propValue === 'all') {
      return this.designs;
    } else {
      return this.designs.map(items => {
        const filtered = items.filter(item => item.category === propValue);
        return filtered;
      });
    }
	};

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
