import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoDinamicaComponent } from './grafico-dinamica.component';

describe('GraficoDinamicaComponent', () => {
  let component: GraficoDinamicaComponent;
  let fixture: ComponentFixture<GraficoDinamicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoDinamicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoDinamicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
