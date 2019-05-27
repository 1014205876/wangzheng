import { TestBed } from '@angular/core/testing';

import { MenuLoadService } from './menu-load.service';

describe('MenuLoadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuLoadService = TestBed.get(MenuLoadService);
    expect(service).toBeTruthy();
  });
});
