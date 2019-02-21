import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScalableImgComponent } from './scalable-img.component';

describe('ScalableImgComponent', () => {
  let component: ScalableImgComponent;
  let fixture: ComponentFixture<ScalableImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScalableImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScalableImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
