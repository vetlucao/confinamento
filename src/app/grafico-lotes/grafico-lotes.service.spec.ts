import { TestBed, inject } from '@angular/core/testing';

import { GraficoLotesService } from './grafico-lotes.service';

describe('GraficoLotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraficoLotesService]
    });
  });

  it('should be created', inject([GraficoLotesService], (service: GraficoLotesService) => {
    expect(service).toBeTruthy();
  }));
});
