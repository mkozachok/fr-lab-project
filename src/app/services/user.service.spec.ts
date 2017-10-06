/* import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../environments/environment';
import { Upload } from '../models/upload-model';
import * as firebase from 'firebase';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

const AngularFireAuthStub = {

}

const AngularFireDatabaseStub = {

}

const RouterStub = {

}
describe('User service', () => {
    let userService: UserService;
    let angularFireAuth: AngularFireAuth;
    let angularFireDatabase: AngularFireDatabase;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                UserService,
                { provide: AngularFireAuth, useValue: AngularFireAuthStub },
                { provide: AngularFireDatabase, useValue: AngularFireDatabaseStub },
                { provide: Router, useValue: RouterStub },

            ]
        });

        userService = TestBed.get(UserService);
        angularFireAuth = TestBed.get(AngularFireAuth);
        angularFireDatabase = TestBed.get(AngularFireDatabase);
        router = TestBed.get(Router);
    });

    it('should create an instance', () => {
        expect(UserService).toBeDefined();
    });

        it('should do something)', () => {
        spyOnProperty(angularFireAuth, 'authState', null).and.returnValue('lala');
        userService.getUser();
        let user = angularFireAuth.authState;
        expect(user).toBeTruthy();
      });  

      
});
 */