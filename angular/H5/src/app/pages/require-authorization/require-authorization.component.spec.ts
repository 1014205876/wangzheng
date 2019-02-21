import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequireAuthorizationComponent } from './require-authorization.component';

describe('RequireAuthorizationComponent', () => {
  let component: RequireAuthorizationComponent;
  let fixture: ComponentFixture<RequireAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequireAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequireAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
