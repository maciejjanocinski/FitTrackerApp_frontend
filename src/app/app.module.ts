import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './auth/login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DiaryComponent } from './diary/diary.component';
import { GoalsComponent } from './goals/goals.component';
import { UserComponent } from './user/user.component';
import { PremiumComponent } from './premium/premium.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ProductsComponent } from './products/products.component';
import {AuthGuardStandard } from './auth/login/AuthGuardStandard';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LogoutComponent} from "./logout/logout.component";
import { ProductComponent } from './productElement/product.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomepageComponent,
    DiaryComponent,
    GoalsComponent,
    UserComponent,
    PremiumComponent,
    RecipesComponent,
    ProductsComponent,
    LogoutComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NavbarComponent,
    MatDialogModule,
    FormsModule,
  ],
  providers: [AuthGuardStandard],
  bootstrap: [AppComponent]
})
export class AppModule { }
