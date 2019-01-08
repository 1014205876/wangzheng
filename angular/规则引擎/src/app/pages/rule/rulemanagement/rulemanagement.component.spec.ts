import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulemanagementComponent } from './rulemanagement.component';

describe('RulemanagementComponent', () => {
  let component: RulemanagementComponent;
  let fixture: ComponentFixture<RulemanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulemanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
