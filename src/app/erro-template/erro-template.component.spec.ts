import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroTemplateComponent } from './erro-template.component';

describe('ErroTemplateComponent', () => {
  let component: ErroTemplateComponent;
  let fixture: ComponentFixture<ErroTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErroTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
