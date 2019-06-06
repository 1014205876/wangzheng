import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRateDisposed } from './edit-rate-disposed.component';

describe('EditRateDisposed', () => {
  let component: EditRateDisposed;
  let fixture: ComponentFixture<EditRateDisposed>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRateDisposed ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRateDisposed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
