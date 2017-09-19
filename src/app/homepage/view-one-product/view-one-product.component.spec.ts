import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneProductComponent } from './view-one-product.component';

describe('ViewOneProductComponent', () => {
  let component: ViewOneProductComponent;
  let fixture: ComponentFixture<ViewOneProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOneProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOneProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
