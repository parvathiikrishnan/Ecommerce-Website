import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { SignupComponent } from './signup/signup.component';
import { AuthenticationGuard } from './authentication.guard';
import { UnauthorizedLoginComponent } from './unauthorized-login/unauthorized-login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'product', component: ProductManagementComponent, canActivate: [AuthenticationGuard]},
  {path: 'signup', component: SignupComponent},
  {path: 'unauthorized', component: UnauthorizedLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
