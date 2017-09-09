import { TestBed, inject } from '@angular/core/testing';

import { DesignServiceService } from './design-service.service';

describe('DesignServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DesignServiceService]
    });
  });

  it('should be created', inject([DesignServiceService], (service: DesignServiceService) => {
    expect(service).toBeTruthy();
  }));
});
