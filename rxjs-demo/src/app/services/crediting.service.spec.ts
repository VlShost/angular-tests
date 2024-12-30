import { TestBed } from '@angular/core/testing';

import { CreditingService } from './crediting.service';

describe('CreditingService', () => {
  let service: CreditingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
