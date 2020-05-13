import { Injectable } from '@angular/core';
import { Aliment } from '../models/aliment.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import { Fridge } from '../models/fridge.model';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlimentService {

  fridge: Fridge;
  alimentSubject = new Subject<Aliment[]>();

  constructor(private authService: AuthService) {

    this.fridge = new Fridge(new Array<Aliment>());

    this.authService.authSubject.subscribe(
      (isAuth) => {
        if(!isAuth) {
          this.fridge = new Fridge(new Array<Aliment>());
        }
      }
    )
     
   }


   emitAliments(aliments?: Aliment[]) {
     this.alimentSubject.next(aliments? aliments :this.fridge.aliments);
   }

   getAllAliments() {
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

   filtersAliments(searchName: string) {
     const alimentFiltered = this.fridge.aliments.filter(aliment => aliment.name.toLowerCase().includes(searchName.toLocaleLowerCase()));

     this.emitAliments(alimentFiltered);
   }

   addAliment(aliment: Aliment) {
     this.fridge.aliments.push(aliment);
     this.saveAliments();
   }

   deleteAliment(aliment: Aliment) {
     const index = this.fridge.aliments.indexOf(aliment);
     this.fridge.aliments.splice(index,1);
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
}
