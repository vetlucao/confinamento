import { TestBed, inject } from '@angular/core/testing';

import { GraficoDesempenhoService } from './grafico-desempenho.service';

describe('GraficoDesempenhoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraficoDesempenhoService]
    });
  });

  it('should be created', inject([GraficoDesempenhoService], (service: GraficoDesempenhoService) => {
    expect(service).toBeTruthy();
  }));
});
