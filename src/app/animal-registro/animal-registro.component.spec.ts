import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalRegistroComponent } from './animal-registro.component';

describe('AnimalRegistroComponent', () => {
  let component: AnimalRegistroComponent;
  let fixture: ComponentFixture<AnimalRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
