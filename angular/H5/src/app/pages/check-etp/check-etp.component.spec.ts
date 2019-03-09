import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckEtpComponent } from './check-etp.component';

describe('CheckEtpComponent', () => {
  let component: CheckEtpComponent;
  let fixture: ComponentFixture<CheckEtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckEtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckEtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
