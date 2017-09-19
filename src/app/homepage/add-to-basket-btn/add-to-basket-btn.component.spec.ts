import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToBasketBtnComponent } from './add-to-basket-btn.component';

describe('AddToBasketBtnComponent', () => {
  let component: AddToBasketBtnComponent;
  let fixture: ComponentFixture<AddToBasketBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToBasketBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToBasketBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
