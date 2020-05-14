import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth:boolean;
  isAuthSubscription: Subscription;
  isCollapsed: boolean;

  constructor(private authService: AuthService) { }
  
  ngOnInit(): void {
    this.isCollapsed = true; 
    this.isAuthSubscription = this.authService.authSubject.subscribe(
      (value) => {
        this.isAuth = value;
      }
      );
    }
    
    ngOnDestroy(): void {
      this.isAuthSubscription.unsubscribe();
    }

    signOut() {
      this.authService.signOut();
    }
  

}
