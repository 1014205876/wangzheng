import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedDisposedComponent } from './extended-disposed.component';

describe('ExtendedDisposedComponent', () => {
  let component: ExtendedDisposedComponent;
  let fixture: ComponentFixture<ExtendedDisposedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendedDisposedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedDisposedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
