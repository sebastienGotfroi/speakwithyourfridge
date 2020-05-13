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
  copyAliments: Aliment[];
  searchInput: string;

  alimentsColLeft: Aliment[];
  alimentsColRight: Aliment[];

  constructor(private alimentService: AlimentService,
              public dialog: MatDialog) { }

  ngOnInit(): void {

    this.alimentSubscription = this.alimentService.alimentsSubject.subscribe(
      (value:Aliment[]) => {
        this.aliments = value;
        this.copyAliments = value;
        this.initTabs();
      }
    );
    this.alimentService.getAllAliments();
  }

  ngOnDestroy(): void {
    this.alimentSubscription.unsubscribe();
  }

  initTabs() {
      this.filter();
      const numberOfAliments = this.copyAliments.length;
      const endFirstCol = Math.ceil(numberOfAliments/2)

      this.alimentsColLeft = this.copyAliments.slice(0, endFirstCol);
      this.alimentsColRight = this.copyAliments.slice(endFirstCol, numberOfAliments);
  }

  showAliment() {
    this.dialog.open(AlimentFormComponent, {
      panelClass: 'custom-modalbox'
    });
  }

  filter() {  
    if(this.aliments && this.searchInput) {
      this.copyAliments = this.aliments.filter(aliment => aliment.name.toLowerCase().includes(this.searchInput.toLocaleLowerCase()));   
    }
  }

  deleteAliment(aliment: Aliment) {
    this.alimentService.deleteAliment(aliment);
  }

  save(aliment:Aliment) {
    this.alimentService.modifyAliment(aliment);
  }

}
