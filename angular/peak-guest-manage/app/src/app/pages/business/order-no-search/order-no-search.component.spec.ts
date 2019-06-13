import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNoSearchComponent } from './order-no-search.component';

describe('OrderNoSearchComponent', () => {
  let component: OrderNoSearchComponent;
  let fixture: ComponentFixture<OrderNoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderNoSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderNoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
