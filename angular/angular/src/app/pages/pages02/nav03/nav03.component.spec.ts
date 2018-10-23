import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nav03Component } from './nav03.component';

describe('Nav03Component', () => {
  let component: Nav03Component;
  let fixture: ComponentFixture<Nav03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nav03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nav03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
