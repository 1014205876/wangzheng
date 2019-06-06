import { TestBed, inject } from '@angular/core/testing';

import { RegularService } from './regular.service';

describe('RegularService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegularService]
    });
  });

  it('should be created', inject([RegularService], (service: RegularService) => {
    expect(service).toBeTruthy();
  }));
});
