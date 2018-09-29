import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pages04Component } from './pages04.component';

describe('Pages04Component', () => {
  let component: Pages04Component;
  let fixture: ComponentFixture<Pages04Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pages04Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pages04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
