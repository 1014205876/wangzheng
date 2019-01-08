import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeefieldComponent } from './seefield.component';

describe('SeefidldComponent', () => {
  let component: SeefieldComponent;
  let fixture: ComponentFixture<SeefieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeefieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
