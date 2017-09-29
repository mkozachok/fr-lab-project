import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '.././services/user.service';
import { By } from '@angular/platform-browser';

import { ProfilePageComponent } from './profile-page.component';

import { DebugElement, Component, Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';

import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';


/*   const UserServiceStub = {
    getUser(){
      return {
        photoURL: 'url',
        displayName: 'Tony Stark'
      }
    }

};


describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
  let userService: UserService; 
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [ProfilePageComponent],
         providers: [
          { provide: UserService, useValue: UserServiceStub }
      ],
      schemas: [NO_ERRORS_SCHEMA] 
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    de = fixture.debugElement.query(By.css('.user-fullname'));
    el = de.nativeElement;

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display user name', () => {
    component.user = userService.getUser()
    fixture.detectChanges()
  })
});  */