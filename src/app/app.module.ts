import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './auth/login/login.component';
import {HomepageComponent} from './homepage/homepage.component';
import {DiaryComponent} from './diary/diary.component';
import {GoalsComponent} from './goals/goals.component';
import {UserComponent} from './user/user.component';
import {PremiumComponent} from './premium/premium.component';
import {RecipesComponent} from './recipes/recipes.component';
import {ProductsComponent} from './products/products.component';
import {AuthGuardStandard} from './auth/login/AuthGuardStandard';
import {NavbarComponent} from './navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LogoutComponent} from "./logout/logout.component";
import {ProductComponent} from './productElement/product.component';
import {MatDialogModule} from '@angular/material/dialog';
import {SuccessComponent} from './success/success.component';
import {CancelComponent} from './cancel/cancel.component';
import {ActivePremiumComponent} from './active-premium/active-premium.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {PremiumModalComponent} from './recipes/premium-modal.component';
import {RecipeElementComponent} from './recipe-element/recipe-element.component';
import {BodyMetricsComponent} from './body-metrics/body-metrics.component';
import {GoalInitComponent} from './goal-init/goal-init.component';
import {GoalInitModalComponent} from "./goal-init/goalInit-modal.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityElementComponent } from './activity-element/activity-element.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import {DeleteModalComponent} from "./user/deleteModal.component";


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
    SuccessComponent,
    CancelComponent,
    ActivePremiumComponent,
    PremiumModalComponent,
    RecipeElementComponent,
    BodyMetricsComponent,
    GoalInitComponent,
    GoalInitModalComponent,
    ActivitiesComponent,
    ActivityElementComponent,
    WorkoutsComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    NavbarComponent,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    ModalModule.forRoot()
  ],
  providers: [AuthGuardStandard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
