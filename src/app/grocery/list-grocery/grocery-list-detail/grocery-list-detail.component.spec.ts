import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryListDetailComponent } from './grocery-list-detail.component';

describe('GroceryListDetailComponent', () => {
  let component: GroceryListDetailComponent;
  let fixture: ComponentFixture<GroceryListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
