import { Component, OnInit } from '@angular/core';
import { AlimentService } from 'src/app/services/aliment.service';
import { Aliment } from 'src/app/models/aliment.model';
import { MatDialog } from '@angular/material/dialog';
import { AddFormComponent } from './add-form/add-form.component';

@Component({
  selector: 'app-list-grocery',
  templateUrl: './list-grocery.component.html',
  styleUrls: ['./list-grocery.component.css']
})
export class ListGroceryComponent implements OnInit {

  constructor(private alimentService: AlimentService,
              public dialog: MatDialog) { }

  groceryList:Aliment[];
  copyAliments: Aliment[];
  searchInput: string;

  ngOnInit(): void {
    this.alimentService.alimentsSubject.subscribe(
      (aliments: Aliment[]) => {
        this.groceryList = aliments.filter(
          (aliment) => aliment.quantityToBuy > 0
        );
        this.copyAliments = this.groceryList;
        this.filter();
      });
    this.alimentService.getAllAliments();
  }

  showAddModal() {
    this.dialog.open(AddFormComponent, {
      panelClass: 'custom-modalbox'
    });
  }

  quantityChange(aliment: Aliment) {
    this.alimentService.modifyAliment(aliment);
  }

  quantityToBuyChange(aliment: Aliment) {
    if(aliment.quantityToBuy > 0) {
      aliment.quantityToBuyChangeByUser = true;
      this.alimentService.modifyAliment(aliment);
    } else {
      aliment.quantityToBuyChangeByUser = false;
      this.alimentService.modifyAliment(aliment);
    }
  }
  fillTheFridge() {
    this.alimentService.fillTheFridgeWithAllTheListAndSave();
    this.alimentService.calculateGroceryList();
  }

  fillTheFridgeWithOneAliment(aliment:Aliment) {
    this.alimentService.fillTheFridgeWithOneElementAndSave(aliment);
  }
  filter() {
    if(this.groceryList && this.searchInput !== undefined) {
      this.copyAliments = this.groceryList.filter(aliment => aliment.name.toLowerCase().includes(this.searchInput.toLocaleLowerCase())); 
    }
  }
}