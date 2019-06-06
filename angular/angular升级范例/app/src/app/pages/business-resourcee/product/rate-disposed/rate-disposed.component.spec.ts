import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateDisposedComponent } from './rate-disposed.component';

describe('RateDisposedComponent', () => {
  let component: RateDisposedComponent;
  let fixture: ComponentFixture<RateDisposedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateDisposedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateDisposedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
