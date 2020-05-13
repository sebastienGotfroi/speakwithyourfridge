import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from 'src/app/models/user.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uid: string;
  isAuth: boolean;
  authSubject = new  Subject<boolean>();

  constructor() { 
    this.onAuthStateChanged();
    }

  emitAuthStateChanged() {
    this.authSubject.next(this.isAuth);
  }

  onAuthStateChanged() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true; 
          this.uid = user.uid;
        } else {
          this.isAuth = false;
          this.uid = undefined;     
        }
        console.log("sign In Change");
        this.emitAuthStateChanged();
      }
    );
  }

  createUser(user: User) {
    return new Promise (
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signIn(user: User) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOut() {
    console.log("disconnecting");
    firebase.auth().signOut();
  }
}
