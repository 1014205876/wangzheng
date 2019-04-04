import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Back2Page } from './back2.page';

describe('Back2Page', () => {
  let component: Back2Page;
  let fixture: ComponentFixture<Back2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Back2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Back2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
