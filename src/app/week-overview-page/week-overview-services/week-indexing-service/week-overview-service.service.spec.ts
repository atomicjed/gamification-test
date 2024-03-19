import { TestBed } from '@angular/core/testing';

import { WeekIndexingService } from './week-indexing.service';

describe('WeekOverviewServiceService', () => {
  let service: WeekIndexingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeekIndexingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
