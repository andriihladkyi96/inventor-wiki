import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/login/register-form/register-form.component';
import { AngularFireModule } from '@angular/fire/compat';
import { TestComponent } from './components/login/test/test.component';
import { UsersPageComponent } from './components/users/users-page/users-page.component';
import { UserProfileComponent } from './components/users/user-profile/user-profile.component';
import { UserEditFormComponent } from './components/users/user-edit-form/user-edit-form.component';
import { UserPostsComponent } from './components/post/user-posts/user-posts.component';
import { PostViewComponent } from './components/post/post-view/post-view.component';
import { PostFormComponent } from './components/post/post-form/post-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { WarningDialogComponent } from './components/post/post-dialogs/warning-dialog/warning-gialog.component';
import { RolePageComponent } from './components/role/role-page/role-page.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {AddCategoryComponent} from "./components/add-category/add-category.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {MatCardModule} from "@angular/material/card";
import { HeaderComponent } from './components/header/header.component';
import { ChangesMessageComponent } from './components/users/changes-message/changes-message.component';
import { AddUserFormComponent } from './components/users/add-user-form/add-user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegisterFormComponent,
    TestComponent,
    UsersPageComponent,
    UserProfileComponent,
    UserEditFormComponent,
    UserPostsComponent,
    PostViewComponent,
    PostFormComponent,
    WarningDialogComponent,
    RolePageComponent,
    AddCategoryComponent,
    MainPageComponent,
    HeaderComponent,
    ChangesMessageComponent,
    AddUserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    MatDialogModule,
    MatMenuModule,
    AngularEditorModule,
    HttpClientModule,
    MatDividerModule,
    MatCheckboxModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
