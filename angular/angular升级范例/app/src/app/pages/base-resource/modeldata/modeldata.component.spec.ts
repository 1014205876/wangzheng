import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeldataComponent } from './modeldata.component';

describe('FielddataComponent', () => {
  let component: ModeldataComponent;
  let fixture: ComponentFixture<ModeldataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeldataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
