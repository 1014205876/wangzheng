import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeInfoComponent } from './authorize-info.component';

describe('AuthorizeInfoComponent', () => {
  let component: AuthorizeInfoComponent;
  let fixture: ComponentFixture<AuthorizeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
