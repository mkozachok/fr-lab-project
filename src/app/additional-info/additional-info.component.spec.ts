import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInfoComponent } from './additional-info.component';

describe('AdditionalInfoComponent', () => {
  let component: AdditionalInfoComponent;
  let fixture: ComponentFixture<AdditionalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
