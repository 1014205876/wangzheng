import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nav01Component } from './nav01.component';

describe('Nav01Component', () => {
  let component: Nav01Component;
  let fixture: ComponentFixture<Nav01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nav01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nav01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
