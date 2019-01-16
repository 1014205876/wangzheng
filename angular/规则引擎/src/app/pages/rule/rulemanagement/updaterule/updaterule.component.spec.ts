import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateruleComponent } from './updaterule.component';

describe('UpdateruleComponent', () => {
  let component: UpdateruleComponent;
  let fixture: ComponentFixture<UpdateruleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateruleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateruleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
