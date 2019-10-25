import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarMesaPage } from './ingresar-mesa.page';

describe('IngresarMesaPage', () => {
  let component: IngresarMesaPage;
  let fixture: ComponentFixture<IngresarMesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarMesaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
