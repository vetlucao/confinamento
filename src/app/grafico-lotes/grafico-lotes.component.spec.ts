import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoLotesComponent } from './grafico-lotes.component';

describe('GraficoLotesComponent', () => {
  let component: GraficoLotesComponent;
  let fixture: ComponentFixture<GraficoLotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoLotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
