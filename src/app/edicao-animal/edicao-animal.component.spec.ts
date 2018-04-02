import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoAnimalComponent } from './edicao-animal.component';

describe('EdicaoAnimalComponent', () => {
  let component: EdicaoAnimalComponent;
  let fixture: ComponentFixture<EdicaoAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdicaoAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdicaoAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
