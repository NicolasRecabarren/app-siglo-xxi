import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarOrdenPage } from './pagar-orden.page';

describe('PagarOrdenPage', () => {
  let component: PagarOrdenPage;
  let fixture: ComponentFixture<PagarOrdenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarOrdenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarOrdenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
