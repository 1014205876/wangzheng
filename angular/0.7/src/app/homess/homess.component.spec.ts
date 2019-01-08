import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomessComponent } from './homess.component';

describe('HomessComponent', () => {
  let component: HomessComponent;
  let fixture: ComponentFixture<HomessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
