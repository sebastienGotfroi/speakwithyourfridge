import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlimentService } from '../services/aliment.service';
import { Aliment } from '../models/aliment.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AlimentFormComponent } from '../aliment-form/aliment-form.component';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit, OnDestroy {

  alimentSubscription: Subscription;

  aliments: Aliment[];
  searchInput: string;

  alimentsColLeft: Aliment[];
  alimentsColRight: Aliment[];

  constructor(private alimentService: AlimentService,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.alimentSubscription = this.alimentService.alimentSubject.subscribe(
      (value:Aliment[]) => {
        this.aliments = value;
        this.initTabs();
      }
    );
    this.alimentService.getAllAliments();
  }

  ngOnDestroy(): void {
    this.alimentSubscription.unsubscribe();
  }

  initTabs() {

      const numberOfAliments = this.aliments.length;
      const endFirstCol = Math.ceil(numberOfAliments/2)

      this.alimentsColLeft = this.aliments.slice(0, endFirstCol);
      this.alimentsColRight = this.aliments.slice(endFirstCol, numberOfAliments);
  }

  showAliment() {
    this.dialog.open(AlimentFormComponent, {
      panelClass: 'custom-modalbox'
    });
  }

  filter() {
    this.alimentService.filtersAliments(this.searchInput);
  }

  deleteAliment(aliment: Aliment) {
    this.alimentService.deleteAliment(aliment);
  }

  save() {
    this.alimentService.saveAliments();
  }

}
