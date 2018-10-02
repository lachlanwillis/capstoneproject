import { TestBed, inject } from '@angular/core/testing';

import { StatDataService } from './stat-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StatDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [StatDataService]
    });
  });

  it('should be created', inject([StatDataService], (service: StatDataService) => {
    expect(service).toBeTruthy();
  }));
});
