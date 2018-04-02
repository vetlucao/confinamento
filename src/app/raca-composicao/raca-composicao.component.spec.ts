import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacaComposicaoComponent } from './raca-composicao.component';

describe('RacaComposicaoComponent', () => {
  let component: RacaComposicaoComponent;
  let fixture: ComponentFixture<RacaComposicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacaComposicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacaComposicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
