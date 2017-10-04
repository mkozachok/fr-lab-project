import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeDialogComponent } from './size-dialog.component';

describe('SizeDialogComponent', () => {
  let component: SizeDialogComponent;
  let fixture: ComponentFixture<SizeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
