import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateBoxComponent } from './validate-box.component';

describe('ValidateBoxComponent', () => {
  let component: ValidateBoxComponent;
  let fixture: ComponentFixture<ValidateBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
