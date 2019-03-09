import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpListComponent } from './etp-list.component';

describe('EtpListComponent', () => {
  let component: EtpListComponent;
  let fixture: ComponentFixture<EtpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
