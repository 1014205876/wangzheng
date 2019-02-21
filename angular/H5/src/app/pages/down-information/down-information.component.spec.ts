import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownInformationComponent } from './down-information.component';

describe('DownInformationComponent', () => {
  let component: DownInformationComponent;
  let fixture: ComponentFixture<DownInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
