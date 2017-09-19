import { Injectable } from '@angular/core';
import { Design } from '../models/design-model';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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

  getDesigns(): FirebaseListObservable<any[]>{
    let content = this.db.list('/redactor/design');
    return content;
  }

}
