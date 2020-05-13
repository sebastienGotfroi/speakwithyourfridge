import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { GroceryService } from './services/grocery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  fridgeFull: boolean;
  
  constructor(private groceryService:GroceryService) {
  }

  ngOnInit(): void {
    this.groceryService.isFullSubject.subscribe(
      (isFull: boolean) => this.fridgeFull = isFull
    );
    this.groceryService.calculateFridgeFull();
  }
}
