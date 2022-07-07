import { TestBed } from '@angular/core/testing';

import { AuthGuardTrueService } from './auth-guard-true.service';

describe('AuthGuardTrueService', () => {
  let service: AuthGuardTrueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardTrueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
