import { Component, OnInit } from '@angular/core';
import { AlimentService } from '../services/aliment.service';
import { Aliment } from '../models/aliment.model';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
})
export class FridgeComponent implements OnInit {

  aliments: Aliment[];

  alimentsColLeft: Aliment[];
  alimentsColRight: Aliment[];

  constructor(private alimentService: AlimentService) { }

  ngOnInit(): void {
    this.initTabs();
  }

  initTabs() {
    this.aliments = this.alimentService.aliments;

    const numberOfAliments = this.aliments.length;
    const endFirstCol = Math.ceil(numberOfAliments/2)

    this.alimentsColLeft = this.aliments.slice(0, endFirstCol);
    this.alimentsColRight = this.aliments.slice(endFirstCol, numberOfAliments);
  }

  showAlliment() {
    console.log(this.aliments);
  }

}
