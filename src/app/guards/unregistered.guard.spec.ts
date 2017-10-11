import { TestBed, async, inject } from '@angular/core/testing';

import { UnregisteredGuard } from './unregistered.guard';

describe('UnregisteredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnregisteredGuard]
    });
  });

  it('should ...', inject([UnregisteredGuard], (guard: UnregisteredGuard) => {
    expect(guard).toBeTruthy();
  }));
});
