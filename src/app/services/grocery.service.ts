import { Injectable } from '@angular/core';
import { AlimentService } from './aliment.service';
import { Aliment } from '../models/aliment.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {

  constructor() {}

  calculateQuantityToBuy(aliment: Aliment) {
    const quantity = aliment.quantity;
    const maxQuantity = aliment.maxQuantity;
    const minQuantity = aliment.minQuantity;
    const quantityToBuyChangeByUser = aliment.quantityToBuyChangeByUser;
    const isAutomatic = aliment.isAutomatic;

    if(!quantityToBuyChangeByUser) {
      if(isAutomatic && maxQuantity !== 0 && quantity <= minQuantity) {
        aliment.quantityToBuy = maxQuantity - quantity;
      } else {
        aliment.quantityToBuy = 0;
      }
    }
  }

  fridgeIsFull(aliments: Aliment[]): boolean {
    if(aliments) {
      return aliments.filter(aliment => aliment.quantityToBuy > 0).length > 0 ? false : true;
    }
  }
}
