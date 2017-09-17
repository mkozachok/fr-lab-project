import { Injectable } from '@angular/core';
import { Design } from '../models/design-model';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class DesignService {
  //design: Design
  designs:FirebaseListObservable<any>;
  constructor(
	  private db: AngularFireDatabase,
	) {
    this.designs = db.list('/redactor/design');
    
  }
  
  setDesign(design): firebase.Promise<void>  {
    return this.designs.push(design);
  }

}
