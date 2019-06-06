import { TestBed, inject } from '@angular/core/testing';

import { MenuLoadService } from './menu-load.service';

describe('MenuLoadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuLoadService]
    });
  });

  it('should be created', inject([MenuLoadService], (service: MenuLoadService) => {
    expect(service).toBeTruthy();
  }));
});
