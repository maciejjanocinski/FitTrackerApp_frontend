import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {HomepageComponent} from './homepage/homepage.component';
import {AuthGuardStandard} from './auth/login/AuthGuardStandard';
import {DiaryComponent} from './diary/diary.component';
import {GoalsComponent} from './goals/goals.component';
import {UserComponent} from './user/user.component';
import {PremiumComponent} from './premium/premium.component';
import {ProductsComponent} from './products/products.component';
import {LogoutComponent} from "./logout/logout.component";
import {SuccessComponent} from "./success/success.component";
import {CancelComponent} from "./cancel/cancel.component";
import {AuthGuardStandardForPremium} from "./auth/login/AuthGuardStandardForPremium";
import {AuthGuardPremiumForPremium} from "./auth/login/AuthGuardPremiumForPremium";
import {RecipesComponent} from "./recipes/recipes.component";
import {AuthGuardPremium} from "./auth/login/AuthGuardPremium";
import {ActivePremiumComponent} from "./active-premium/active-premium.component";
import {BodyMetricsComponent} from "./body-metrics/body-metrics.component";
import {GoalInitComponent} from "./goal-init/goal-init.component";
import {ActivitiesComponent} from "./activities/activities.component";
import {WorkoutsComponent} from "./workouts/workouts.component";

const routes: Routes = [
  { path: 'auth/register', component: RegisterComponent},
  { path: 'auth/login', component: LoginComponent},
  { path: '', component: HomepageComponent, canActivate: [AuthGuardStandard]},
  { path: 'diary', component: DiaryComponent, canActivate: [AuthGuardStandard]},
  { path: 'goals', component: GoalsComponent, canActivate: [AuthGuardStandard]},
  { path: 'user', component: UserComponent, canActivate: [AuthGuardStandard]},
  { path: 'body-metrics', component: BodyMetricsComponent, canActivate: [AuthGuardStandard]},
  { path: 'goal-init', component: GoalInitComponent, canActivate: [AuthGuardStandard]},
  { path: 'premium', component: PremiumComponent, canActivate: [AuthGuardStandardForPremium]},
  { path: 'premium/active', component: ActivePremiumComponent, canActivate: [AuthGuardPremiumForPremium]},
  { path: 'activities', component: ActivitiesComponent, canActivate: [AuthGuardStandard]},
  { path: 'workouts', component: WorkoutsComponent, canActivate: [AuthGuardStandard]},
  { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuardPremium]},
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuardStandard]},
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardStandard]},
  { path: 'success', component: SuccessComponent, canActivate: [AuthGuardStandard]},
  { path: 'cancel', component: CancelComponent, canActivate: [AuthGuardStandard]},
   // { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
