import { TestBed, inject } from '@angular/core/testing';

import { StatDataService } from './stat-data.service';

describe('StatDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatDataService]
    });
  });

  it('should be created', inject([StatDataService], (service: StatDataService) => {
    expect(service).toBeTruthy();
  }));
});
