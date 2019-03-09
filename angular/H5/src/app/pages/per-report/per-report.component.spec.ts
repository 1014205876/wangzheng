import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerReportComponent } from './per-report.component';

describe('PerReportComponent', () => {
  let component: PerReportComponent;
  let fixture: ComponentFixture<PerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
