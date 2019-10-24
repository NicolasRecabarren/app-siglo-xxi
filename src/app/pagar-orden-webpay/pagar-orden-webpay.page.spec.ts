import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarOrdenWebpayPage } from './pagar-orden-webpay.page';

describe('PagarOrdenWebpayPage', () => {
  let component: PagarOrdenWebpayPage;
  let fixture: ComponentFixture<PagarOrdenWebpayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagarOrdenWebpayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagarOrdenWebpayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
