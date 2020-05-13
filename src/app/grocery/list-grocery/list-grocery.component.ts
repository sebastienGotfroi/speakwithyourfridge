import { Component, OnInit } from '@angular/core';
import { AlimentService } from 'src/app/services/aliment.service';
import { Aliment } from 'src/app/models/aliment.model';

@Component({
  selector: 'app-list-grocery',
  templateUrl: './list-grocery.component.html',
  styleUrls: ['./list-grocery.component.css']
})
export class ListGroceryComponent implements OnInit {

  constructor(private alimentService: AlimentService) { }

  groceryList:Aliment[];

  ngOnInit(): void {
    this.alimentService.alimentsSubject.subscribe(
      (aliments: Aliment[]) => {
        this.groceryList = aliments.filter(
          (aliment) => aliment.quantityToBuy > 0
        );
      });
    this.alimentService.getAllAliments();
  }

}
