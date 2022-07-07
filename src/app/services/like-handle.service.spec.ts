import { TestBed } from '@angular/core/testing';

import { LikeHandleService } from './like-handle.service';

describe('LikeHandleService', () => {
  let service: LikeHandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikeHandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
