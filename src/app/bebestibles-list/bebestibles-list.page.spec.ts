import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BebestiblesListPage } from './bebestibles-list.page';

describe('BebestiblesListPage', () => {
  let component: BebestiblesListPage;
  let fixture: ComponentFixture<BebestiblesListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BebestiblesListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BebestiblesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
