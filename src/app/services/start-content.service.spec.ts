import { TestBed } from '@angular/core/testing';

import { StartContentService } from './start-content.service';

describe('StartContentService', () => {
  let service: StartContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
