import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyANgmWp7vojTI8dsGUDmbllnqGMk_klOEw",
      authDomain: "speakwithyourfridge.firebaseapp.com",
      databaseURL: "https://speakwithyourfridge.firebaseio.com",
      projectId: "speakwithyourfridge",
      storageBucket: "speakwithyourfridge.appspot.com",
      messagingSenderId: "1086673089779",
      appId: "1:1086673089779:web:e1372b4d4c42cc5e5f3386",
      measurementId: "G-L80364PM47"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
