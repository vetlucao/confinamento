import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroLoteComponent } from './cadastro-lote.component';

describe('CadastroLoteComponent', () => {
  let component: CadastroLoteComponent;
  let fixture: ComponentFixture<CadastroLoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroLoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
