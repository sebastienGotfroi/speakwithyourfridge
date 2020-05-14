import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlimentService } from 'src/app/services/aliment.service';
import { Subscription } from 'rxjs';
import { Aliment } from 'src/app/models/aliment.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

  aliments: Aliment[];
  alimentSubscription: Subscription;
  alimentName: string;
  alimentSelected: Aliment;
  copyAlimentSelected: Aliment;
  error:boolean;

  constructor(private alimentService:AlimentService,
              public dialogRef: MatDialogRef<AddFormComponent>) { }

  ngOnInit(): void {
    this.alimentSubscription = this.alimentService.alimentsSubject.subscribe(
      (aliments) => {
        this.aliments = aliments.filter(
          (aliment) => aliment.quantityToBuy === 0
        )
      }
    );
    this.alimentService.getAllAliments();
    this.error = false;
  }

  inputChange() {
    this.alimentSelected = this.aliments.find(
      (aliment:Aliment) => {
        return aliment.name === this.alimentName
      }
    );
    this.copyAlimentSelected = new Aliment(this.alimentSelected.name, this.alimentSelected.quantity);
    this.copyAlimentSelected.quantityToBuy = this.alimentSelected.quantityToBuy;
  }

  validQuantity() {
    if(this.copyAlimentSelected.quantityToBuy > 0) {
      this.error = false;
    } else {
      this.error = true;
    }
  }

  save() {
    this.alimentSelected.quantityToBuy = this.copyAlimentSelected.quantityToBuy;
    this.alimentSelected.quantityToBuyChangeByUser = true;
    this.alimentService.modifyAliment(this.alimentSelected);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
