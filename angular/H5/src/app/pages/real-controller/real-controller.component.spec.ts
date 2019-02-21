import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealControllerComponent } from './real-controller.component';

describe('RealControllerComponent', () => {
  let component: RealControllerComponent;
  let fixture: ComponentFixture<RealControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
