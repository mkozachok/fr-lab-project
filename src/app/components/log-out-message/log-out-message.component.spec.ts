import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogOutMessageComponent } from './log-out-message.component';

describe('LogOutMessageComponent', () => {
  let component: LogOutMessageComponent;
  let fixture: ComponentFixture<LogOutMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogOutMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogOutMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
