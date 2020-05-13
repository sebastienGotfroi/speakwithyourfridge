import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterGroceryItemComponent } from './parameter-grocery-item.component';

describe('ParameterGroceryItemComponent', () => {
  let component: ParameterGroceryItemComponent;
  let fixture: ComponentFixture<ParameterGroceryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterGroceryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterGroceryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
