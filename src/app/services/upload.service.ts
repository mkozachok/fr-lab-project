import { Injectable } from '@angular/core';
import { Upload } from '../models/upload-model';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {
  url: string;
  private basePath: string = '/avatars';
  constructor(private db: AngularFireDatabase) { }
  pushUpload(upload: Upload, path: string) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${path}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      null,
      null,
      () => {
        // upload success
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.url = upload.url;
      }
    );
  }

  getUrl(){
    return this.url;
  }

  saveFileData(upload: Upload, path: string) {
    this.db.list(`${path}/`).set('photoURL', upload.url);
  }

  // Writes the file details to the realtime db
  deleteFileData(key: string, path: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  deleteFileStorage(name:string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }

}