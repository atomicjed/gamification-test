import { TestBed } from '@angular/core/testing';

import { GetHabitsService } from './get-habits.service';

describe('GetHabitsService', () => {
  let service: GetHabitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetHabitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
