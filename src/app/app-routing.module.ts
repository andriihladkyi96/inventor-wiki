import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/login/register-form/register-form.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard'
import { TestComponent } from './components/login/test/test.component';
import { UsersPageComponent } from './components/users/users-page/users-page.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { UserEditFormComponent } from './components/users/user-edit-form/user-edit-form.component';
import { RolePageComponent } from './components/role/role-page/role-page.component';
import { RoleGuard } from './guards/role.guard';
import { MainPageComponent } from "./components/main-page/main-page.component";
import { AddCategoryComponent } from "./components/add-category/add-category.component";
import { UserPostsComponent } from "./components/post/user-posts/user-posts.component";


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])
const redirectLoggedInToMain = () => redirectLoggedInTo([''])

const routes: Routes = [

  { path: '', component: MainPageComponent,
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: 'login', component: LoginFormComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToMain }
  },
  { path: 'register', component: RegisterFormComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToMain }
  },
  { path: 'add-category', component: AddCategoryComponent,
    canActivate: [AngularFireAuthGuard, RoleGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
   },
  { path: 'posts', component: UserPostsComponent,
    canActivate: [AngularFireAuthGuard, RoleGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  { path: 'role', component: RolePageComponent,
    canActivate: [AngularFireAuthGuard, RoleGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
      role: "SuperAdmin" 
    }
    
  },
  { path: 'users', component: UsersPageComponent
    
  },
  { path: 'profile_settings', component: UserProfileComponent
    
  },
  {path: 'user/:id', component: UserEditFormComponent },
  { path: 'my-profile', component: UserProfileComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
