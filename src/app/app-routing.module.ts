import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/login/register-form/register-form.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard'
import { TestComponent } from './components/login/test/test.component';
import { UsersPageComponent } from './components/users/users-page/users-page.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { UserEditFormComponent } from './components/users/user-edit-form/user-edit-form.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])
const redirectLoggedInToMain = () => redirectLoggedInTo([''])

const routes: Routes = [
  { path: '', component: TestComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  {path: 'user/:id', component: UserEditFormComponent },
  { path: 'my-profile', component: UserProfileComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'users', component: UsersPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'login', component: LoginFormComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToMain } },
  { path: 'register', component: RegisterFormComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToMain } }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
