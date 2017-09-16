import { TestBed, inject } from '@angular/core/testing';

import { MakeOrderService } from './make-order.service';

describe('MakeOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MakeOrderService]
    });
  });

  it('should be created', inject([MakeOrderService], (service: MakeOrderService) => {
    expect(service).toBeTruthy();
  }));
});
