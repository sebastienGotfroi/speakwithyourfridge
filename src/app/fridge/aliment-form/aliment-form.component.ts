import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlimentService } from '../../services/aliment.service';
import { Aliment } from '../../models/aliment.model';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, NgModel, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aliment-form',
  templateUrl: './aliment-form.component.html',
  styleUrls: ['./aliment-form.component.css']
})
export class AlimentFormComponent implements OnInit, OnDestroy {

  alimentList: Aliment[];
  alimentSubscription: Subscription;

  newAliment:Aliment;

  newAlimentForm: FormGroup;

  constructor(private alimentService:AlimentService,
              public dialogRef: MatDialogRef<AlimentFormComponent>,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.alimentList = new Array<Aliment>();
    this.initForm();
    this.initAlimentList();
    this.newAliment = new Aliment("", 0);
  }

  ngOnDestroy() {
    this.alimentSubscription.unsubscribe();
  }

  onSaveAliment(){
    this.alimentService.addAliment(this.newAliment);
    this.onClose();
  }

  onClose() {
    this.dialogRef.close();
  }

  initForm() {
    this.newAlimentForm = this.formBuilder.group({
      name: ['', [Validators.required, , checkNameExistInput(this.alimentList)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      maxQuantity: ['', Validators.min(0)],
      minQuantity: ['', Validators.min(0)]
    }, {
      validators: minQuantityLowerThanMaxQuantity
    });
  }

  initAlimentList() {
    this.alimentSubscription = this.alimentService.alimentsSubject.subscribe(
      (aliments) => {
        this.alimentList=aliments;
        this.newAlimentForm.controls['name'].setValidators([Validators.required, checkNameExistInput(this.alimentList)]);
      }
    );
    this.alimentService.getAllAliments();
  }
}
export function checkNameExistInput(nameList: Aliment[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
      const val = control.value;
      return nameList && nameList.some(aliment => aliment.name === val) ? {'nameListExist': true} : null;
  }
}

export const minQuantityLowerThanMaxQuantity: ValidatorFn = (control: FormGroup):
  ValidationErrors |null => {
    const minQuantity: number = +control.get('minQuantity').value;
    const maxQuantity: number = +control.get('maxQuantity').value;

    return (minQuantity > 0 || maxQuantity > 0) && minQuantity >= maxQuantity ? {'minQuantityBiggerThanMaxQuantity': true} : null; 
  }


