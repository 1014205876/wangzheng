import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtpcCertificationComponent } from './etpc-certification.component';

describe('EtpcCertificationComponent', () => {
  let component: EtpcCertificationComponent;
  let fixture: ComponentFixture<EtpcCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtpcCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtpcCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
