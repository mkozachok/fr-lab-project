import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeOrderComponent } from './make-order.component';

describe('MakeOrderComponent', () => {
  let component: MakeOrderComponent;
  let fixture: ComponentFixture<MakeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
