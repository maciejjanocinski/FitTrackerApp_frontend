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
import {RecipesComponent} from './recipes/recipes.component';
import {ProductsComponent} from './products/products.component';
import {LogoutComponent} from "./logout/logout.component";


const routes: Routes = [
  { path: 'auth/register', component: RegisterComponent},
  { path: 'auth/login', component: LoginComponent},
  { path: '', component: HomepageComponent, canActivate: [AuthGuardStandard]},
  { path: 'diary', component: DiaryComponent, canActivate: [AuthGuardStandard]},
  { path: 'goals', component: GoalsComponent, canActivate: [AuthGuardStandard]},
  { path: 'user', component: UserComponent, canActivate: [AuthGuardStandard]},
  { path: 'premium', component: PremiumComponent, canActivate: [AuthGuardStandard]},
  { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuardStandard]},
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuardStandard]},
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuardStandard]},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
