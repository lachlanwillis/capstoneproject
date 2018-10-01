import { TestBed, inject } from '@angular/core/testing';

import { MessagesService } from './messages.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MessagesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [MessagesService]
    });
  });

  it('should be created', inject([MessagesService], (service: MessagesService) => {
    expect(service).toBeTruthy();
  }));
});
