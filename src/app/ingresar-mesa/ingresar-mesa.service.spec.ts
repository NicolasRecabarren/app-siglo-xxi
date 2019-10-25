import { TestBed } from '@angular/core/testing';

import { IngresarMesaService } from './ingresar-mesa.service';

describe('IngresarMesaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngresarMesaService = TestBed.get(IngresarMesaService);
    expect(service).toBeTruthy();
  });
});
