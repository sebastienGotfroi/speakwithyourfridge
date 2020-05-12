import { Component, OnInit } from '@angular/core';
import { AlimentService } from '../services/aliment.service';
import { Aliment } from '../models/aliment.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit {

  alimentSubscription: Subscription;

  aliments: Aliment[];
  searchInput: string;

  alimentsColLeft: Aliment[];
  alimentsColRight: Aliment[];

  constructor(private alimentService: AlimentService) { }

  ngOnInit(): void {

    this.alimentSubscription = this.alimentService.alimentSubject.subscribe(
      (value:Aliment[]) => {
        this.aliments = value;
        this.initTabs();
      }
    );
    this.alimentService.getAllAliments();
  }

  initTabs() {

    const numberOfAliments = this.aliments.length;
    const endFirstCol = Math.ceil(numberOfAliments/2)

    this.alimentsColLeft = this.aliments.slice(0, endFirstCol);
    this.alimentsColRight = this.aliments.slice(endFirstCol, numberOfAliments);
  }

  showAliment() {
    console.log(this.searchInput);
  }

  filter() {
    this.alimentService.filtersAliments(this.searchInput);
  }

}
