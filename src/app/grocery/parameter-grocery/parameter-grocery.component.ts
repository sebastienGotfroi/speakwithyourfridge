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
  copyAliments: Aliment[];

  searchInput: string;

  constructor(private alimentService: AlimentService) { }

  ngOnInit(): void {
    this.alimentSubscription = this.alimentService.alimentsSubject.subscribe(
      (aliments: Aliment[]) => {
        this.aliments = aliments;
        this.copyAliments = aliments;
        this.filter();
      }
    );
    this.alimentService.getAllAliments();
  }

  ngOnDestroy():void {
    this.alimentSubscription.unsubscribe();
  }

  save(aliment: Aliment) {
    this.alimentService.modifyAliment(aliment);
  }

  filter() {
    if(this.aliments && this.searchInput) {
      this.copyAliments = this.aliments.filter(aliment => aliment.name.toLowerCase().includes(this.searchInput.toLocaleLowerCase())); 
    }
  }

}
