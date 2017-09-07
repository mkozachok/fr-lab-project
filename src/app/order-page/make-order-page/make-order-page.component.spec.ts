import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeOrderPageComponent } from './make-order-page.component';

describe('MakeOrderPageComponent', () => {
  let component: MakeOrderPageComponent;
  let fixture: ComponentFixture<MakeOrderPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeOrderPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
