import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegistrationPageComponent } from './registration-page.component';
import { UserService } from '../services/user.service';
// import { Router } from '@angular/router';
// import { Upload } from '../models/upload-model';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent,
    fixture: ComponentFixture<RegistrationPageComponent>,
    userService: UserService,
    de: DebugElement,
    el: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationPageComponent],
      providers: [{provide: UserService}]
    })
      .compileComponents();
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    userService = fixture.debugElement.injector.get(UserService);
    de = fixture.debugElement.query(By.css('h2'));
    el = de.nativeElement;
  }));

  it('should display original title', () => {
    // Сообщаем Ангуляр, что нужно запусть механизм обнаружения изменений
    // (change detection)
    fixture.detectChanges();
    expect(el.textContent).toContain(component.title);
  });

  it('should display a different test title', () => {
    component.title = 'Test Title';

    // Сообщаем Ангуляр, что нужно запусть механизм обнаружения изменений
    // но уже после того, как проинициализировали компонент новым значением
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });

  it('no title in the DOM until manually call `detectChanges`', () => {
    // TestBed.createComponent не вызывает автоматически detectChanges()
    expect(el.textContent).toEqual('');
  });
    beforeEach(() => {
      fixture = TestBed.createComponent(RegistrationPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
});
