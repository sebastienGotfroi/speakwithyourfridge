import { Component, Input, OnInit } from '@angular/core';
import { Aliment } from 'src/app/models/aliment.model';
import { AlimentService } from 'src/app/services/aliment.service';
import { inOutWithFadeAnimation} from 'src/app/animations/inOutWithFadeAnimation';

@Component({
  selector: 'grocery-list-detail',
  templateUrl: './grocery-list-detail.component.html',
  styleUrls: ['./grocery-list-detail.component.css'],
  animations: [inOutWithFadeAnimation]
})
export class GroceryListDetailComponent implements OnInit {

  @Input() aliment: Aliment;
  showDetail: boolean = false;

  constructor(private alimentService: AlimentService) { }

  ngOnInit(): void {

  }

  quantityChange() {
    this.alimentService.modifyAliment(this.aliment);
  }

  quantityToBuyChange() {
      this.aliment.quantityToBuyChangeByUser = true;
      this.alimentService.modifyAliment(this.aliment);
  }

  fillTheFridgeWithOneAliment(aliment:Aliment) {
    this.alimentService.fillTheFridgeWithOneElementAndSave(aliment);
  }

  addOneQuantityToBuy(positive: boolean) {
    this.aliment.addOneQuantityToBuy(positive);
    this.quantityToBuyChange();
  }

  addOneQuantityInTheFridge(positive: boolean) {
    this.aliment.addOneQuantityInTheFridge(positive);
    this.quantityChange();
  }
}