import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseConfig} from 'src/environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  fridgeFull = true;
  
  constructor() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
