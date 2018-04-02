import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDesempenhoComponent } from './grafico-desempenho.component';

describe('GraficoDesempenhoComponent', () => {
  let component: GraficoDesempenhoComponent;
  let fixture: ComponentFixture<GraficoDesempenhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoDesempenhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoDesempenhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
