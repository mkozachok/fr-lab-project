import { TestBed, inject } from '@angular/core/testing';

import { DesignService } from './design.service';

describe('DesignService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DesignService]
    });
  });

  it('should be created', inject([DesignService], (service: DesignService) => {
    expect(service).toBeTruthy();
  }));
});
