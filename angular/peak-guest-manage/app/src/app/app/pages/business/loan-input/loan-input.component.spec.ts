import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanInputComponent } from './loan-input.component';

describe('LoanInputComponent', () => {
  let component: LoanInputComponent;
  let fixture: ComponentFixture<LoanInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
