import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCardPage } from './list-card.page';

describe('ListCardPage', () => {
  let component: ListCardPage;
  let fixture: ComponentFixture<ListCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
