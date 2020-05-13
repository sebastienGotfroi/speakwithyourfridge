import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroceryComponent } from './list-grocery.component';

describe('ListGroceryComponent', () => {
  let component: ListGroceryComponent;
  let fixture: ComponentFixture<ListGroceryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGroceryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
