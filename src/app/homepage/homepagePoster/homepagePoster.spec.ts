import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagePosterComponent } from './homepagePoster.component';

describe('HomepageComponent', () => {
  let component: HomepagePosterComponent;
  let fixture: ComponentFixture<HomepagePosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepagePosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepagePosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
