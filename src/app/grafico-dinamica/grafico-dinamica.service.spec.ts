import { TestBed, inject } from '@angular/core/testing';

import { GraficoDinamicaService } from './grafico-dinamica.service';

describe('GraficoDinamicaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraficoDinamicaService]
    });
  });

  it('should be created', inject([GraficoDinamicaService], (service: GraficoDinamicaService) => {
    expect(service).toBeTruthy();
  }));
});
