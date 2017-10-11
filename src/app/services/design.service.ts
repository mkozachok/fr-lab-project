import { Injectable } from '@angular/core';
import { Design } from '../models/design-model';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from "firebase";

@Injectable()
export class DesignService {
  designs:FirebaseListObservable<any>;
  designCategories: FirebaseListObservable<any>;
  designFilter: FirebaseListObservable<any>;
  templateTypes: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) {
    this.db = db;
    this.designs = db.list('/redactor/design');
    this.designCategories = db.list('/redactor/designCategories');
    this.designFilter = db.list('/redactor/priceFilter');
    this.templateTypes = db.list('/templateTypes');
  }

  setDesign(design): firebase.Promise<void>  {
    return this.designs.push(design);
  }

  getDesigns() {
    return this.designs;
  }

  getDesignCategory() {
    return this.designCategories;
  }

  getTemplateTypes() {
    return this.templateTypes;
  }

  getPrice() {
    return this.designFilter;
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
  
  typeChoose(myType) {
    if(myType === 'all') {
      return this.designs;
    } else if (myType === 'free'){
      return this.designs.map(items => {
        const filtered = items.filter(item => item.price === myType);
        return filtered;
      });
    } else if (myType !== 'free' && myType !== 'all'){
      return this.designs.map(items => {
        const filtered = items.filter(item => !isNaN(item.price));
        return filtered;      
      })     
    }
  }

  deleteDesign(id):firebase.Promise<boolean>{
      return this.db.database.ref('/redactor/design').child(id).remove();
  }

  deleteDesignImg(url):firebase.Promise<boolean>{
    return firebase.storage().refFromURL(url).delete();
  }

  deleteArrOfDesigns(arr){
    arr.forEach(el => {
			if (el.url.includes('firebasestorage.googleapis.com/v0/b/kolibri')) {
				this.deleteDesignImg(el.url)
			}
			this.deleteDesign(el.id)
		})
  }

  findDesign(phrase, arrayOfDesigns) {
    let transformedPhrase = phrase.toLowerCase();
    return arrayOfDesigns.filter(x => {
      return x['name'].toLowerCase().indexOf(transformedPhrase) >= 0;
    });
  }

  updateDesign(key, design): firebase.Promise<void> {
		return this.designs.update(key, design);
	}
}
