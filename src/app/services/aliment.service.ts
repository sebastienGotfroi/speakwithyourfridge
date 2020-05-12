import { Injectable } from '@angular/core';
import { Aliment } from '../models/aliment.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlimentService {

  aliments: Aliment[];
  alimentSubject = new Subject<Aliment[]>();

  constructor() {

    this.aliments = [
      {
        name: 'Tomate',
        quantity: 5,
        minQuantity: 8
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
      {
        name: 'Carotte',
        quantity: 5
      },
      {
        name: 'Oignon',
        quantity: 2
      },
      {
        name: 'Poivron',
        quantity: 1
      },
      {
        name: 'Cornichon',
        quantity: 12
      },
      {
        name: 'Lait',
        quantity: 7
      },
      {
        name: 'Crème',
        quantity: 5
      },
      {
        name: 'Jus d\'orange',
        quantity: 2
      },
      {
        name: 'Pomme',
        quantity: 1
      },
      {
        name: 'Poire',
        quantity: 12
      },
      {
        name: 'Sauce tomate',
        quantity: 7
      }, {
        name: 'Mayonnaise',
        quantity: 5
      },
      {
        name: 'Pesto',
        quantity: 2
      },
      {
        name: 'Pâte',
        quantity: 1
      },
      {
        name: 'Riz',
        quantity: 12
      },
      {
        name: 'Farine',
        quantity: 7
      },
  ]
   }

   emitAliments(aliments?: Aliment[]) {
     this.alimentSubject.next(aliments? aliments :this.aliments);
   }

   getAllAliments() {
     this.emitAliments();
   }

   filtersAliments(searchName: string) {
     const alimentFiltered = this.aliments.filter(aliment => aliment.name.toLowerCase().includes(searchName.toLocaleLowerCase()));

     this.emitAliments(alimentFiltered);
   }

   addAliment(aliment: Aliment) {
     this.aliments.push(aliment);
     this.emitAliments();
   }

   deleteAliment(aliment: Aliment) {
     const index = this.aliments.indexOf(aliment);
     this.aliments.splice(index,1);
     this.emitAliments();
   }
}
