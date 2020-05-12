import { Injectable } from '@angular/core';
import { Aliment } from '../models/aliment.model';

@Injectable({
  providedIn: 'root'
})
export class AlimentService {

  aliments: Aliment[];

  constructor() {

    this.aliments = [
      {
        name: 'Tomate',
        quantity: 5
      },
      {
        name: 'Beurre',
        quantity: 2
      },
      {
        name: 'Champignon',
        quantity: 1
      },
      {
        name: 'Yaourt',
        quantity: 12
      },
      {
        name: 'Oeufs',
        quantity: 7
      },
  ]
   }
}
