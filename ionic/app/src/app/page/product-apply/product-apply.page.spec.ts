import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductApplyPage } from './product-apply.page';

describe('LoginPage', () => {
  let component: ProductApplyPage;
  let fixture: ComponentFixture<ProductApplyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductApplyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductApplyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
