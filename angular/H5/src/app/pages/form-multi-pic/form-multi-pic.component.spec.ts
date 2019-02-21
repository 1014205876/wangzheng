import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMultiPicComponent } from './form-multi-pic.component';

describe('FormMultiPicComponent', () => {
  let component: FormMultiPicComponent;
  let fixture: ComponentFixture<FormMultiPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMultiPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMultiPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
