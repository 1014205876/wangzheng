import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanSucComponent } from './loan-suc.component';

describe('LoanSucComponent', () => {
  let component: LoanSucComponent;
  let fixture: ComponentFixture<LoanSucComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanSucComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanSucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
