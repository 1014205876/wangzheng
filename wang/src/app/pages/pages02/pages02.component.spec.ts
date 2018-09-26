import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Pages02Component } from './pages02.component';

describe('Pages02Component', () => {
  let component: Pages02Component;
  let fixture: ComponentFixture<Pages02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pages02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pages02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
