import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Back1Page } from './back1.page';

describe('Back1Page', () => {
  let component: Back1Page;
  let fixture: ComponentFixture<Back1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Back1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Back1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
