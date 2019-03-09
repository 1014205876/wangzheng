import { TestBed, inject } from '@angular/core/testing';

import { HttpServe } from './http-serve.service';

describe('HttpServeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpServe]
    });
  });

  it('should be created', inject([HttpServe], (service: HttpServe) => {
    expect(service).toBeTruthy();
  }));
});
