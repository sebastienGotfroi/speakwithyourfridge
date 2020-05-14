import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FridgeComponent } from './fridge/fridge.component';
import { AlimentService } from './services/aliment.service';
import { AlimentFormComponent } from './fridge/aliment-form/aliment-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from'@angular/material/autocomplete';
import { MatInputModule } from'@angular/material/input';
import {DomSanitizer} from '@angular/platform-browser';
import { ParameterGroceryComponent } from './grocery/parameter-grocery/parameter-grocery.component';
import { ParameterGroceryItemComponent } from './grocery/parameter-grocery/parameter-grocery-item/parameter-grocery-item.component';
import { GroceryService } from './services/grocery.service';
import { firebaseConfig} from 'src/environments/environment'

const appRoutes : Routes = [
  { path: 'signIn', component: SigninComponent},
  { path: 'signUp', component: SignupComponent},
  { path: 'grocery/parameter', canActivate:[AuthGuardService], component: ParameterGroceryComponent},
  { path: 'grocery/list', canActivate:[AuthGuardService], component: ListGroceryComponent},
  {path: 'fridge', canActivate:[AuthGuardService], component: FridgeComponent},
  { path: '', canActivate:[AuthGuardService], component: FridgeComponent},
  { path: '**', canActivate:[AuthGuardService], component: FridgeComponent}
];

import * as firebase from 'firebase';
import { ListGroceryComponent } from './grocery/list-grocery/list-grocery.component';
import { AddFormComponent } from './grocery/list-grocery/add-form/add-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';

firebase.initializeApp(firebaseConfig);
firebase.analytics();

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    FridgeComponent,
    AlimentFormComponent,
    ParameterGroceryComponent,
    ParameterGroceryItemComponent,
    ListGroceryComponent,
    AddFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [
    AlimentFormComponent
  ],
  providers: [AuthService, AuthGuardService, AlimentService, GroceryService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));
  }
 }
