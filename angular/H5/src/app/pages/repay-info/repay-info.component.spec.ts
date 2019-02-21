import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepayInfoComponent } from './repay-info.component';

describe('RepayInfoComponent', () => {
  let component: RepayInfoComponent;
  let fixture: ComponentFixture<RepayInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepayInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepayInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
