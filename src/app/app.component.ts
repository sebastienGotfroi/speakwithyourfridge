import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { GroceryService } from './services/grocery.service';
import { AlimentService } from './services/aliment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  fridgeFull: boolean;
  constructor(private groceryService:GroceryService,
              private alimentService: AlimentService) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
