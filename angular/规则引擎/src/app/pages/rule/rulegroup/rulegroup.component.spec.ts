import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulegroupComponent } from './rulegroup.component';

describe('RulegroupComponent', () => {
  let component: RulegroupComponent;
  let fixture: ComponentFixture<RulegroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulegroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulegroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
