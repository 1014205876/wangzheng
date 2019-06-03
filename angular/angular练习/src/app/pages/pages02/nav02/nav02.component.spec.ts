import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nav02Component } from './nav02.component';

describe('Nav02Component', () => {
  let component: Nav02Component;
  let fixture: ComponentFixture<Nav02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nav02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nav02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
