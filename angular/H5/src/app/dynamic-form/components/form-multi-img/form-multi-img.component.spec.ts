import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMultiImgComponent } from './form-multi-img.component';

describe('FormMultiImgComponent', () => {
  let component: FormMultiImgComponent;
  let fixture: ComponentFixture<FormMultiImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMultiImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMultiImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
