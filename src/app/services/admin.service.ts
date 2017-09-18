import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class AdminService {
  admins:FirebaseListObservable<any>;
  constructor(
    private db: AngularFireDatabase
	) {
    this.admins = db.list('/admins/');
    
  }
  
  setNewAdmin(admin): firebase.Promise<void>  {
    return this.admins.set(admin.id, {
      name: admin.name
    });
  }

  getAdmin(id){
    return this.db.list('/admins/'+id);
  }

  getAdminsList(){
    return this.admins;
  }

}
