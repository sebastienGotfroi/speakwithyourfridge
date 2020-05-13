import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlimentService } from 'src/app/services/aliment.service';
import { Subscription } from 'rxjs';
import { Aliment } from 'src/app/models/aliment.model';

@Component({
  selector: 'app-parameter-grocery',
  templateUrl: './parameter-grocery.component.html',
  styleUrls: ['./parameter-grocery.component.css']
})
export class ParameterGroceryComponent implements OnInit, OnDestroy {

  alimentSubscription: Subscription;
  aliments: Aliment[];

  searchInput: string;

  constructor(private alimentService: AlimentService) { }

  ngOnInit(): void {
    this.alimentSubscription = this.alimentService.alimentSubject.subscribe(
      (aliments: Aliment[]) => this.aliments = aliments
    );
    this.alimentService.getAllAliments();
  }

  ngOnDestroy():void {
    this.alimentSubscription.unsubscribe();
  }

  save() {
    this.alimentService.saveAliments();
  }

  filter() {
    this.alimentService.filtersAliments(this.searchInput);
  }

}
