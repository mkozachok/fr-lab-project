import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactorPageComponent } from './redactor-page.component';

describe('RedactorPageComponent', () => {
  let component: RedactorPageComponent;
  let fixture: ComponentFixture<RedactorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedactorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedactorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
