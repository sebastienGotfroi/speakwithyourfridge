import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Aliment } from 'src/app/models/aliment.model';

@Component({
  selector: 'app-parameter-grocery-item',
  templateUrl: './parameter-grocery-item.component.html',
  styleUrls: ['./parameter-grocery-item.component.css']
})
export class ParameterGroceryItemComponent implements OnInit, OnChanges {

  @Input() aliment: Aliment;
  @Output() alimentChange = new EventEmitter<Aliment>();

  copyAliment: Aliment;

  errors: any;

  constructor() { }

  ngOnInit(): void {
    this.copyAliment = new Aliment(this.aliment.name, this.aliment.quantity);
    this.copyAliment.maxQuantity = this.aliment.maxQuantity;
    this.copyAliment.minQuantity = this.aliment.minQuantity;
    this.copyAliment.isAutomatic = this.aliment.isAutomatic !== undefined ? this.aliment.isAutomatic : true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.aliment && this.copyAliment) {
      this.copyAliment.name = changes.aliment.currentValue['name'];
      this.copyAliment.quantity = changes.aliment.currentValue['quantity'];
      this.copyAliment.maxQuantity = changes.aliment.currentValue['maxQuantity'];
      this.copyAliment.minQuantity = changes.aliment.currentValue['minQuantity'];
      this.copyAliment.isAutomatic = changes.aliment.currentValue['isAutomatic'];
    }
  }


  validateQuantity(): boolean {
    const maxQuantity = this.copyAliment.maxQuantity;
    const minQuantity = this.copyAliment.minQuantity;

    if(maxQuantity && maxQuantity !== 0 && ( minQuantity === null || minQuantity === undefined )){
      
      this.errors = {'minQuantityRequired' : true};
      return false;
    }
    if(maxQuantity && minQuantity && maxQuantity <= minQuantity) {
      this.errors = {'maxQuantityLowerThanMinQuantity': true};
      return false;
    }
    if(minQuantity && minQuantity !== 0 && (!maxQuantity) ){
      
      this.errors = {'maxQuantityRequired' : true};
      return false;
    } 
    if(minQuantity <0) {
      this.errors = {'minQuantityNegative' : true};
      return false;
    }
    
    this.errors = null;
    return true;
  }

  updateValue() {
    if(this.validateQuantity()) {
      this.aliment.maxQuantity = this.copyAliment.maxQuantity;
      this.aliment.minQuantity = this.copyAliment.minQuantity;
      this.aliment.isAutomatic = this.copyAliment.isAutomatic;

      this.alimentChange.emit(this.aliment);
    }
  }

  addMaxQuantity(positive: boolean) {
    if(positive) {
      this.copyAliment.maxQuantity++;
    } else {
      this.copyAliment.maxQuantity--;
    }
    this.updateValue();
  }

  addMinQuantity(positive: boolean) {
    if(positive) {
      this.copyAliment.minQuantity++;
    } else {
      this.copyAliment.minQuantity--;
    }
    this.updateValue();
  }

}
