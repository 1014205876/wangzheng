import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pages03Component } from './pages03.component';

describe('Pages03Component', () => {
  let component: Pages03Component;
  let fixture: ComponentFixture<Pages03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pages03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pages03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
