import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubOrderComponent } from './sub-order.component';

describe('SubOrderComponent', () => {
  let component: SubOrderComponent;
  let fixture: ComponentFixture<SubOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
