import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarOrdenQrPage } from './pagar-orden-qr.page';

describe('PagarOrdenQrPage', () => {
  let component: PagarOrdenQrPage;
  let fixture: ComponentFixture<PagarOrdenQrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarOrdenQrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarOrdenQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
