import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeruleComponent } from './changerule.component';

describe('ChangeruleComponent', () => {
  let component: ChangeruleComponent;
  let fixture: ComponentFixture<ChangeruleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeruleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeruleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
