import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTelComponent } from './step-tel.component';

describe('StepTelComponent', () => {
  let component: StepTelComponent;
  let fixture: ComponentFixture<StepTelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepTelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
