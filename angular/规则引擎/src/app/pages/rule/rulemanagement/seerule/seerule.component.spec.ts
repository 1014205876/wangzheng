import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeruleComponent } from './seerule.component';

describe('SeeruleComponent', () => {
  let component: SeeruleComponent;
  let fixture: ComponentFixture<SeeruleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeruleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeruleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
