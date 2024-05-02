import { TestBed } from '@angular/core/testing';

import { RechargePlanTypeService } from './recharge-plan-type.service';

describe('RechargePlanTypeService', () => {
  let service: RechargePlanTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RechargePlanTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
