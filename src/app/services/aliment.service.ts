import { Injectable } from '@angular/core';
import { Aliment } from '../models/aliment.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Fridge } from '../models/fridge.model';
import { AuthService } from './auth/auth.service';
import { GroceryService } from './grocery.service';

@Injectable({
  providedIn: 'root'
})
export class AlimentService {

  fridge: Fridge;
  alimentsSubject = new Subject<Aliment[]>();
  alimentSubject = new Subject<Aliment>();

  constructor(private authService: AuthService,
              private groceryService: GroceryService) {

    this.fridge = new Fridge(new Array<Aliment>());

    this.authService.authSubject.subscribe(
      (isAuth) => {
        if(!isAuth) {
          this.fridge = new Fridge(new Array<Aliment>());
        } else {
          this.getAllAlimentsFromFirebase();
        }
      }
    );
   }

   emitAliments(aliments?: Aliment[]) {
     this.alimentsSubject.next(aliments? aliments :this.fridge.aliments);
   }

   getAllAliments() {
     this.emitAliments();
   }

   getAllAlimentsFromFirebase() {
     firebase.database().ref('/fridge/'+this.authService.uid).on('value', (data: DataSnapshot) => {
      
      if(data.val()) {
        this.fridge = data.val();
        if(!this.fridge.aliments) {
          this.fridge.aliments = new Array<Aliment>();
        }
      }
      this.emitAliments();
     })
   }

   addAliment(aliment: Aliment) {
     this.fridge.aliments.push(aliment);
     this.calculateGroceryList(aliment);
     this.saveAliments();
   }

   deleteAliment(aliment: Aliment) {
     const index = this.fridge.aliments.indexOf(aliment);
     this.fridge.aliments.splice(index,1);
     this.calculateGroceryList(aliment);
     this.saveAliments();
   }

   modifyAliment(aliment: Aliment) {
    this.calculateGroceryList(aliment);
    this.saveAliments();
   }

   saveAliments() {
     firebase.database().ref('/fridge/'+this.authService.uid).update(this.fridge).catch(
       (error) => {
         console.log("Erreur : " + error);
       }
     ).finally(
       () => this.emitAliments()
     );
   }

   calculateGroceryList(aliment?: Aliment) {
    if(aliment) {
      this.groceryService.calculateQuantityToBuy(aliment);
    }
    this.groceryService.calculateFridgeFull(this.fridge.aliments);
   }

   fillTheFridgeWithAllTheListAndSave() {
     this.fridge.aliments.forEach(
       (aliment) => {
         this.fillTheFridge(aliment);
       }
     );
     this.calculateGroceryList();
     this.saveAliments();
   }

   fillTheFridgeWithOneElementAndSave(aliment: Aliment) {
     this.fillTheFridge(aliment);
     this.saveAliments();
    }
    
    fillTheFridge(aliment: Aliment) {
      aliment.quantity = aliment.quantity + aliment.quantityToBuy;
      aliment.quantityToBuyChangeByUser = false;
      this.groceryService.calculateQuantityToBuy(aliment);
      this.calculateGroceryList();
   }

}
