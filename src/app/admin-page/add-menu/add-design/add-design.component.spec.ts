import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesignComponent } from './add-design.component';

describe('AddDesignComponent', () => {
  let component: AddDesignComponent;
  let fixture: ComponentFixture<AddDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
