import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusListPage } from './menus-list.page';

describe('MenusListPage', () => {
  let component: MenusListPage;
  let fixture: ComponentFixture<MenusListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenusListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
