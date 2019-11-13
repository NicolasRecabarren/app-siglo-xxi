import { TestBed } from '@angular/core/testing';

import { BebestiblesService } from './bebestibles.service';

describe('BebestiblesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BebestiblesService = TestBed.get(BebestiblesService);
    expect(service).toBeTruthy();
  });
});
