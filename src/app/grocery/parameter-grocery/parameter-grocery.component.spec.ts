import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterGroceryComponent } from './parameter-grocery.component';

describe('ParameterGroceryComponent', () => {
  let component: ParameterGroceryComponent;
  let fixture: ComponentFixture<ParameterGroceryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameterGroceryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterGroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
