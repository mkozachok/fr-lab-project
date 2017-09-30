import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, Component, Directive, Input, NO_ERRORS_SCHEMA } from '@angular/core';

import { AboutMeComponent } from './about-me.component';
import { UserService } from '../../services/user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';

/*  describe('AboutMeComponent', () => {
  let component: AboutMeComponent;
  let fixture: ComponentFixture<AboutMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMeComponent ],
      providers:[ UserService, AngularFireAuth ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}); */
