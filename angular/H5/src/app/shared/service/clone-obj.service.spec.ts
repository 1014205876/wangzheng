import { TestBed, inject } from '@angular/core/testing';

import { CloneObjService } from './clone-obj.service';

describe('CloneObjService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CloneObjService]
    });
  });

  it('should be created', inject([CloneObjService], (service: CloneObjService) => {
    expect(service).toBeTruthy();
  }));
});
