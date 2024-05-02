import { TestBed } from '@angular/core/testing';

import { RechargePlanService } from './recharge-plan.service';

describe('RechargePlanService', () => {
  let service: RechargePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechargePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
