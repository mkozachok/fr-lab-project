import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgWindowComponent } from './img-window.component';

describe('ImgWindowComponent', () => {
  let component: ImgWindowComponent;
  let fixture: ComponentFixture<ImgWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
