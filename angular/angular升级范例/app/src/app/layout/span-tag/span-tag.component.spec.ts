import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpanTagComponent } from './span-tag.component';

describe('SpanTagComponent', () => {
  let component: SpanTagComponent;
  let fixture: ComponentFixture<SpanTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpanTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpanTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
